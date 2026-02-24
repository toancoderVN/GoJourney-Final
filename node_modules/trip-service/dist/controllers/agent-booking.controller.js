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
exports.AgentBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const agent_booking_service_1 = require("../services/agent-booking.service");
const agent_booking_dto_1 = require("../dto/agent-booking.dto");
let AgentBookingController = class AgentBookingController {
    agentBookingService;
    constructor(agentBookingService) {
        this.agentBookingService = agentBookingService;
    }
    /**
     * Create Trip from AI Agent booking
     * Called by AI Service when booking is confirmed/cancelled
     */
    async createFromBooking(dto) {
        try {
            const { trip, conversation } = await this.agentBookingService.createTripFromBooking(dto);
            return {
                success: true,
                tripId: trip.id,
                bookingConversationId: conversation.id,
                message: 'Trip created successfully from agent booking'
            };
        }
        catch (error) {
            if (error.status) {
                throw error; // Re-throw NestJS HTTP exceptions
            }
            throw new common_1.HttpException(error.message || 'Failed to create trip from booking', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get conversation history for a trip
     * Returns null if trip is not from agent booking
     */
    async getConversation(tripId) {
        return await this.agentBookingService.getConversation(tripId);
    }
};
exports.AgentBookingController = AgentBookingController;
__decorate([
    (0, common_1.Post)('from-booking'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create trip from AI Agent booking session',
        description: 'Transforms AI booking session data into Trip and saves conversation history'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Trip and conversation created successfully',
        type: agent_booking_dto_1.CreateTripFromBookingResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data or validation failed' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Session already processed (duplicate)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agent_booking_dto_1.CreateTripFromBookingDto]),
    __metadata("design:returntype", Promise)
], AgentBookingController.prototype, "createFromBooking", null);
__decorate([
    (0, common_1.Get)(':tripId/conversation'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get agent conversation for trip',
        description: 'Returns chat history, agent actions, and timeline for agent-booked trips'
    }),
    (0, swagger_1.ApiParam)({ name: 'tripId', description: 'Trip UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversation found',
        type: agent_booking_dto_1.ConversationResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found or has no conversation' }),
    __param(0, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentBookingController.prototype, "getConversation", null);
exports.AgentBookingController = AgentBookingController = __decorate([
    (0, swagger_1.ApiTags)('agent-bookings'),
    (0, common_1.Controller)('trips/agent-bookings'),
    __metadata("design:paramtypes", [agent_booking_service_1.AgentBookingService])
], AgentBookingController);
//# sourceMappingURL=agent-booking.controller.js.map