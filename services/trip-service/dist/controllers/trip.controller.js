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
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trip_service_1 = require("../services/trip.service");
const trip_dto_1 = require("../dto/trip.dto");
const booking_dto_1 = require("../dto/booking.dto");
const note_dto_1 = require("../dto/note.dto");
let TripController = class TripController {
    tripService;
    constructor(tripService) {
        this.tripService = tripService;
    }
    async createTrip(createTripDto) {
        return await this.tripService.createTrip(createTripDto);
    }
    async findTrips(userId, source) {
        if (userId) {
            return await this.tripService.findTripsByUser(userId, source);
        }
        return await this.tripService.findAllTrips();
    }
    async findTripById(id) {
        return await this.tripService.findTripById(id);
    }
    async updateTrip(id, updateTripDto) {
        return await this.tripService.updateTrip(id, updateTripDto);
    }
    async deleteTrip(id) {
        await this.tripService.deleteTrip(id);
    }
    async getTripSummary(id) {
        return await this.tripService.getTripSummary(id);
    }
    // =====================
    // NOTE ENDPOINTS
    // =====================
    async getNotes(tripId) {
        return await this.tripService.findNotesByTrip(tripId);
    }
    async createNote(tripId, createNoteDto) {
        return await this.tripService.createNote(tripId, createNoteDto);
    }
    async updateNote(noteId, updateNoteDto) {
        return await this.tripService.updateNote(noteId, updateNoteDto);
    }
    async deleteNote(noteId) {
        await this.tripService.deleteNote(noteId);
    }
    // Itinerary endpoints
    async createItinerary(tripId) {
        return await this.tripService.createItinerary(tripId);
    }
    async getItinerary(tripId) {
        return await this.tripService.findItineraryByTrip(tripId);
    }
    // Booking endpoints
    async createBooking(tripId, createBookingDto) {
        createBookingDto.tripId = tripId;
        return await this.tripService.createBooking(createBookingDto);
    }
    async getBookings(tripId) {
        return await this.tripService.findBookingsByTrip(tripId);
    }
    async getBookingById(bookingId) {
        return await this.tripService.findBookingById(bookingId);
    }
    async updateBooking(bookingId, updateBookingDto) {
        return await this.tripService.updateBooking(bookingId, updateBookingDto);
    }
    async deleteBooking(bookingId) {
        await this.tripService.deleteBooking(bookingId);
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new trip' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Trip created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "createTrip", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all trips or trips by user' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, description: 'Filter trips by user ID' }),
    (0, swagger_1.ApiQuery)({ name: 'source', required: false, description: 'Filter trips by source (manual/agent_booking/api_import)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trips retrieved successfully' }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "findTrips", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trip by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trip retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "findTripById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trip updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trip_dto_1.UpdateTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "updateTrip", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Trip deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "deleteTrip", null);
__decorate([
    (0, common_1.Get)(':id/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trip summary with statistics' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trip summary retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getTripSummary", null);
__decorate([
    (0, common_1.Get)(':id/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all notes for a trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notes retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Post)(':id/notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a note for a trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Note created successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "createNote", null);
__decorate([
    (0, common_1.Patch)('notes/:noteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a note' }),
    (0, swagger_1.ApiParam)({ name: 'noteId', description: 'Note ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Note updated successfully' }),
    __param(0, (0, common_1.Param)('noteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)('notes/:noteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a note' }),
    (0, swagger_1.ApiParam)({ name: 'noteId', description: 'Note ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Note deleted successfully' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "deleteNote", null);
__decorate([
    (0, common_1.Post)(':id/itinerary'),
    (0, swagger_1.ApiOperation)({ summary: 'Create itinerary for trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Itinerary created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "createItinerary", null);
__decorate([
    (0, common_1.Get)(':id/itinerary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get itinerary for trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Itinerary retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getItinerary", null);
__decorate([
    (0, common_1.Post)(':id/bookings'),
    (0, swagger_1.ApiOperation)({ summary: 'Create booking for trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)(':id/bookings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings for trip' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Trip ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookings retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trip not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Get)('bookings/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking by ID' }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Patch)('bookings/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking' }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('bookingId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "updateBooking", null);
__decorate([
    (0, common_1.Delete)('bookings/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete booking' }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Booking deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "deleteBooking", null);
exports.TripController = TripController = __decorate([
    (0, swagger_1.ApiTags)('trips'),
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
//# sourceMappingURL=trip.controller.js.map