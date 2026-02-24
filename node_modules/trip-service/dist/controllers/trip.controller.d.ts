import { TripService } from '../services/trip.service';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { CreateNoteDto, UpdateNoteDto } from '../dto/note.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    createTrip(createTripDto: CreateTripDto): Promise<import("../entities").Trip>;
    findTrips(userId?: string, source?: 'manual' | 'agent_booking' | 'api_import'): Promise<import("../entities").Trip[]>;
    findTripById(id: string): Promise<import("../entities").Trip>;
    updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<import("../entities").Trip>;
    deleteTrip(id: string): Promise<void>;
    getTripSummary(id: string): Promise<{
        trip: import("../entities").Trip;
        totalDays: number;
        totalItineraryItems: number;
        totalBookings: number;
        totalBookingCost: number;
        currency: string;
        itinerary: import("../entities").Itinerary | null;
        bookingsByType: Record<string, import("../entities").Booking[]>;
    }>;
    getNotes(tripId: string): Promise<import("../entities/trip-note.entity").TripNote[]>;
    createNote(tripId: string, createNoteDto: CreateNoteDto): Promise<import("../entities/trip-note.entity").TripNote>;
    updateNote(noteId: string, updateNoteDto: UpdateNoteDto): Promise<import("../entities/trip-note.entity").TripNote>;
    deleteNote(noteId: string): Promise<void>;
    createItinerary(tripId: string): Promise<import("../entities").Itinerary>;
    getItinerary(tripId: string): Promise<import("../entities").Itinerary | null>;
    createBooking(tripId: string, createBookingDto: CreateBookingDto): Promise<import("../entities").Booking>;
    getBookings(tripId: string): Promise<import("../entities").Booking[]>;
    getBookingById(bookingId: string): Promise<import("../entities").Booking>;
    updateBooking(bookingId: string, updateBookingDto: UpdateBookingDto): Promise<import("../entities").Booking>;
    deleteBooking(bookingId: string): Promise<void>;
}
//# sourceMappingURL=trip.controller.d.ts.map