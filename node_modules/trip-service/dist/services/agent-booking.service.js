"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentBookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trip_entity_1 = require("../entities/trip.entity");
const types_1 = require("../types");
const booking_conversation_entity_1 = require("../entities/booking-conversation.entity");
let AgentBookingService = class AgentBookingService {
    tripRepository;
    conversationRepository;
    constructor(tripRepository, conversationRepository) {
        this.tripRepository = tripRepository;
        this.conversationRepository = conversationRepository;
    }
    /**
     * Create Trip from AI Agent booking
     * Called by AI Service khi booking hoàn thành
     */
    async createTripFromBooking(dto) {
        const { sessionId, userId, bookingData } = dto;
        // Check if session already processed (prevent duplicate)
        const existing = await this.conversationRepository.findOne({
            where: { sessionId }
        });
        if (existing) {
            throw new common_1.ConflictException(`Session ${sessionId} already processed`);
        }
        // Validate state
        if (bookingData.state !== 'CONFIRMED' && bookingData.state !== 'CANCELLED') {
            throw new common_1.BadRequestException('State must be CONFIRMED or CANCELLED');
        }
        // Parse dates
        const startDate = new Date(bookingData.tripDetails.checkInDate);
        const endDate = new Date(bookingData.tripDetails.checkOutDate);
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Check-in date must be before check-out date');
        }
        // Calculate trip duration and budget
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const avgBudget = (bookingData.tripDetails.budgetMinPerNight + bookingData.tripDetails.budgetMaxPerNight) / 2;
        // 🆕 NEW: Use totalTripBudget if provided, otherwise calculate from per-night budget
        const totalBudget = bookingData.tripDetails.totalTripBudget || (avgBudget * nights);
        // Parse destination
        const destination = this.parseDestination(bookingData.tripDetails.destination);
        // Create Trip entity
        const trip = this.tripRepository.create({
            userId,
            name: `${destination.city} - ${bookingData.hotelContact.name}`,
            status: bookingData.state === 'CONFIRMED' ? types_1.TripStatus.CONFIRMED : types_1.TripStatus.CANCELLED,
            startDate,
            endDate,
            destination: {
                country: destination.country,
                city: destination.city,
                coordinates: { lat: 0, lng: 0 } // TODO: Geocode later
            },
            participants: bookingData.tripDetails.numberOfGuests,
            budget: {
                total: totalBudget,
                currency: bookingData.paymentInfo?.currency || 'VND',
                breakdown: {
                    accommodation: bookingData.paymentInfo?.amount || totalBudget,
                    flights: 0,
                    activities: 0,
                    food: 0,
                    transport: 0,
                    other: 0
                }
            },
            preferences: {
                pace: 'moderate',
                interests: this.extractInterests(bookingData.tripDetails.mustHaveAmenities),
                mustSee: [],
                avoidances: []
            },
            source: 'agent_booking'
        });
        const savedTrip = await this.tripRepository.save(trip);
        // Create BookingConversation entity
        const conversation = this.conversationRepository.create({
            tripId: savedTrip.id,
            sessionId,
            hotelContact: bookingData.hotelContact,
            bookingRequest: {
                userContact: bookingData.userContact,
                tripDetails: bookingData.tripDetails
            },
            messages: bookingData.messages || [],
            agentActions: bookingData.agentActions || [],
            paymentInfo: bookingData.paymentInfo || null,
            state: bookingData.state,
            completedAt: new Date(bookingData.completedAt)
        });
        const savedConversation = await this.conversationRepository.save(conversation);
        // Update trip with conversation reference
        savedTrip.agent_booking_id = savedConversation.id;
        await this.tripRepository.save(savedTrip);
        return { trip: savedTrip, conversation: savedConversation };
    }
    /**
     * Get conversation by tripId
     */
    async getConversation(tripId) {
        const conversation = await this.conversationRepository.findOne({
            where: { tripId }
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`No conversation found for trip ${tripId}`);
        }
        // Calculate duration
        const started = new Date(conversation.createdAt);
        const completed = conversation.completedAt ? new Date(conversation.completedAt) : new Date();
        const duration = Math.floor((completed.getTime() - started.getTime()) / 1000);
        return {
            conversationId: conversation.id,
            sessionId: conversation.sessionId,
            messages: conversation.messages,
            agentActions: conversation.agentActions,
            hotelContact: conversation.hotelContact,
            state: conversation.state,
            timeline: {
                started: conversation.createdAt.toISOString(),
                completed: conversation.completedAt?.toISOString() || new Date().toISOString(),
                duration
            }
        };
    }
    /**
     * Update conversation state
     */
    async updateConversationState(sessionId, state) {
        const conversation = await this.conversationRepository.findOne({
            where: { sessionId }
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation not found for session ${sessionId}`);
        }
        conversation.state = state;
        conversation.updatedAt = new Date();
        await this.conversationRepository.save(conversation);
    }
    /**
     * Helper: Parse destination string
     */
    parseDestination(dest) {
        const parts = dest.split(',').map(s => s.trim());
        if (parts.length >= 2) {
            return { city: parts[0], country: parts[1] };
        }
        // Default to Vietnam
        return { city: dest, country: 'Việt Nam' };
    }
    /**
     * Helper: Extract interests from amenities
     */
    extractInterests(amenities) {
        const mapping = {
            swimmingPool: 'Leisure',
            seaView: 'Nature',
            breakfastIncluded: 'Food',
            wifi: 'Technology',
            airConditioner: 'Comfort'
        };
        return Object.entries(amenities)
            .filter(([key, value]) => value && mapping[key])
            .map(([key]) => mapping[key]);
    }
};
exports.AgentBookingService = AgentBookingService;
exports.AgentBookingService = AgentBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trip_entity_1.Trip)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_conversation_entity_1.BookingConversation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AgentBookingService);
//# sourceMappingURL=agent-booking.service.js.map