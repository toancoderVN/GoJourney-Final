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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trip_entity_1 = require("../entities/trip.entity");
const itinerary_entity_1 = require("../entities/itinerary.entity");
const itinerary_item_entity_1 = require("../entities/itinerary-item.entity");
const booking_entity_1 = require("../entities/booking.entity");
const trip_note_entity_1 = require("../entities/trip-note.entity");
let TripService = class TripService {
    tripRepository;
    itineraryRepository;
    itineraryItemRepository;
    bookingRepository;
    noteRepository;
    constructor(tripRepository, itineraryRepository, itineraryItemRepository, bookingRepository, noteRepository) {
        this.tripRepository = tripRepository;
        this.itineraryRepository = itineraryRepository;
        this.itineraryItemRepository = itineraryItemRepository;
        this.bookingRepository = bookingRepository;
        this.noteRepository = noteRepository;
    }
    // Trip CRUD operations
    async createTrip(createTripDto) {
        // Validate dates
        const startDate = new Date(createTripDto.startDate);
        const endDate = new Date(createTripDto.endDate);
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        if (startDate < new Date()) {
            throw new common_1.BadRequestException('Start date cannot be in the past');
        }
        const trip = this.tripRepository.create({
            userId: createTripDto.userId,
            name: createTripDto.name,
            startDate,
            endDate,
            participants: createTripDto.numberOfPeople || 1,
            destination: {
                country: 'Unknown',
                city: 'Unknown',
                coordinates: { lat: 0, lng: 0 }
            },
            budget: {
                total: createTripDto.budgetMax || 0,
                currency: createTripDto.currency || 'USD',
                breakdown: {
                    flights: 0,
                    accommodation: 0,
                    activities: 0,
                    food: 0,
                    transport: 0,
                    other: 0
                }
            },
            preferences: createTripDto.preferences || {
                pace: 'moderate',
                interests: [],
                mustSee: [],
                avoidances: []
            }
        });
        return await this.tripRepository.save(trip);
    }
    async findAllTrips() {
        return await this.tripRepository.find({
            relations: ['itinerary', 'bookings'],
            order: { createdAt: 'DESC' },
        });
    }
    async findTripsByUser(userId, source) {
        const whereCondition = { userId };
        // Add source filter if provided
        if (source) {
            whereCondition.source = source;
        }
        return await this.tripRepository.find({
            where: whereCondition,
            relations: ['itinerary', 'bookings'],
            order: { createdAt: 'DESC' },
        });
    }
    async findTripById(id) {
        const trip = await this.tripRepository.findOne({
            where: { id },
            relations: ['itinerary', 'bookings'],
        });
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }
    async updateTrip(id, updateTripDto) {
        const trip = await this.findTripById(id);
        // Validate dates if provided
        if (updateTripDto.startDate || updateTripDto.endDate) {
            const startDate = updateTripDto.startDate
                ? new Date(updateTripDto.startDate)
                : trip.startDate;
            const endDate = updateTripDto.endDate
                ? new Date(updateTripDto.endDate)
                : trip.endDate;
            if (startDate >= endDate) {
                throw new common_1.BadRequestException('Start date must be before end date');
            }
        }
        // Update basic fields
        if (updateTripDto.name)
            trip.name = updateTripDto.name;
        if (updateTripDto.status)
            trip.status = updateTripDto.status;
        if (updateTripDto.startDate)
            trip.startDate = new Date(updateTripDto.startDate);
        if (updateTripDto.endDate)
            trip.endDate = new Date(updateTripDto.endDate);
        if (updateTripDto.numberOfPeople)
            trip.participants = updateTripDto.numberOfPeople;
        // Update budget
        if (updateTripDto.budget) {
            trip.budget = updateTripDto.budget;
        }
        else if (updateTripDto.budgetMax || updateTripDto.currency) {
            trip.budget = {
                ...trip.budget,
                total: updateTripDto.budgetMax || trip.budget.total,
                currency: updateTripDto.currency || trip.budget.currency,
            };
        }
        // Update preferences
        if (updateTripDto.preferences) {
            trip.preferences = { ...trip.preferences, ...updateTripDto.preferences };
        }
        return await this.tripRepository.save(trip);
    }
    async deleteTrip(id) {
        const trip = await this.findTripById(id);
        await this.tripRepository.remove(trip);
    }
    // Itinerary operations
    async createItinerary(tripId) {
        // Verify trip exists
        await this.findTripById(tripId);
        const itinerary = this.itineraryRepository.create({
            tripId,
            totalDistance: 0,
            estimatedCost: 0,
        });
        return await this.itineraryRepository.save(itinerary);
    }
    async findItineraryByTrip(tripId) {
        await this.findTripById(tripId); // Verify trip exists
        return await this.itineraryRepository.findOne({
            where: { tripId },
            relations: ['items'],
        });
    }
    async updateItinerary(id, updateData) {
        const itinerary = await this.itineraryRepository.findOne({
            where: { id },
        });
        if (!itinerary) {
            throw new common_1.NotFoundException(`Itinerary with ID ${id} not found`);
        }
        Object.assign(itinerary, updateData);
        return await this.itineraryRepository.save(itinerary);
    }
    // Booking operations
    async createBooking(createBookingDto) {
        // Verify trip exists
        await this.findTripById(createBookingDto.tripId);
        const booking = this.bookingRepository.create({
            tripId: createBookingDto.tripId,
            providerId: 'provider-1', // Default provider for now
            type: createBookingDto.type,
            providerBookingRef: createBookingDto.providerReference,
            details: createBookingDto.bookingDetails || {},
            price: {
                amount: createBookingDto.amount || 0,
                currency: createBookingDto.currency || 'USD',
                breakdown: {
                    base: createBookingDto.amount || 0,
                    taxes: 0,
                    fees: 0,
                    discounts: 0,
                }
            },
        });
        return await this.bookingRepository.save(booking);
    }
    async findBookingsByTrip(tripId) {
        await this.findTripById(tripId); // Verify trip exists
        return await this.bookingRepository.find({
            where: { tripId },
            order: { createdAt: 'DESC' },
        });
    }
    async findBookingById(id) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async updateBooking(id, updateBookingDto) {
        const booking = await this.findBookingById(id);
        if (updateBookingDto.status)
            booking.status = updateBookingDto.status;
        if (updateBookingDto.serviceName)
            booking.details = { ...booking.details, serviceName: updateBookingDto.serviceName };
        if (updateBookingDto.amount || updateBookingDto.currency) {
            booking.price = {
                ...booking.price,
                amount: updateBookingDto.amount || booking.price.amount,
                currency: updateBookingDto.currency || booking.price.currency,
            };
        }
        return await this.bookingRepository.save(booking);
    }
    async deleteBooking(id) {
        const booking = await this.findBookingById(id);
        await this.bookingRepository.remove(booking);
    }
    // Business logic methods
    async getTripSummary(tripId) {
        const trip = await this.findTripById(tripId);
        const itinerary = await this.findItineraryByTrip(tripId);
        const bookings = await this.findBookingsByTrip(tripId);
        const totalBookingCost = bookings.reduce((sum, booking) => {
            return sum + (booking.price?.amount || 0);
        }, 0);
        const daysCount = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
        return {
            trip,
            totalDays: daysCount,
            totalItineraryItems: itinerary?.items?.length || 0,
            totalBookings: bookings.length,
            totalBookingCost,
            currency: trip.budget.currency,
            itinerary,
            bookingsByType: this.groupBookingsByType(bookings),
        };
    }
    groupBookingsByType(bookings) {
        const grouped = {};
        bookings.forEach(booking => {
            const type = booking.type.toString();
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(booking);
        });
        return grouped;
    }
    // =====================
    // NOTE OPERATIONS
    // =====================
    async findNotesByTrip(tripId) {
        await this.findTripById(tripId); // Verify trip exists
        return await this.noteRepository.find({
            where: { tripId },
            order: { isPinned: 'DESC', createdAt: 'DESC' },
        });
    }
    async createNote(tripId, createNoteDto) {
        await this.findTripById(tripId); // Verify trip exists
        const note = this.noteRepository.create({
            tripId,
            content: createNoteDto.content,
            isPinned: createNoteDto.isPinned || false,
        });
        return await this.noteRepository.save(note);
    }
    async updateNote(noteId, updateNoteDto) {
        const note = await this.noteRepository.findOne({
            where: { id: noteId },
        });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${noteId} not found`);
        }
        if (updateNoteDto.content !== undefined) {
            note.content = updateNoteDto.content;
        }
        if (updateNoteDto.isPinned !== undefined) {
            note.isPinned = updateNoteDto.isPinned;
        }
        return await this.noteRepository.save(note);
    }
    async deleteNote(noteId) {
        const note = await this.noteRepository.findOne({
            where: { id: noteId },
        });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${noteId} not found`);
        }
        await this.noteRepository.remove(note);
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trip_entity_1.Trip)),
    __param(1, (0, typeorm_1.InjectRepository)(itinerary_entity_1.Itinerary)),
    __param(2, (0, typeorm_1.InjectRepository)(itinerary_item_entity_1.ItineraryItem)),
    __param(3, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(4, (0, typeorm_1.InjectRepository)(trip_note_entity_1.TripNote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TripService);
//# sourceMappingURL=trip.service.js.map