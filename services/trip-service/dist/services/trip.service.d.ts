import { Repository } from 'typeorm';
import { Trip } from '../entities/trip.entity';
import { Itinerary } from '../entities/itinerary.entity';
import { ItineraryItem } from '../entities/itinerary-item.entity';
import { Booking } from '../entities/booking.entity';
import { TripNote } from '../entities/trip-note.entity';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { CreateNoteDto, UpdateNoteDto } from '../dto/note.dto';
export declare class TripService {
    private tripRepository;
    private itineraryRepository;
    private itineraryItemRepository;
    private bookingRepository;
    private noteRepository;
    constructor(tripRepository: Repository<Trip>, itineraryRepository: Repository<Itinerary>, itineraryItemRepository: Repository<ItineraryItem>, bookingRepository: Repository<Booking>, noteRepository: Repository<TripNote>);
    createTrip(createTripDto: CreateTripDto): Promise<Trip>;
    findAllTrips(): Promise<Trip[]>;
    findTripsByUser(userId: string, source?: 'manual' | 'agent_booking' | 'api_import'): Promise<Trip[]>;
    findTripById(id: string): Promise<Trip>;
    updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<Trip>;
    deleteTrip(id: string): Promise<void>;
    createItinerary(tripId: string): Promise<Itinerary>;
    findItineraryByTrip(tripId: string): Promise<Itinerary | null>;
    updateItinerary(id: string, updateData: Partial<{
        totalDistance: number;
        estimatedCost: number;
    }>): Promise<Itinerary>;
    createBooking(createBookingDto: CreateBookingDto): Promise<Booking>;
    findBookingsByTrip(tripId: string): Promise<Booking[]>;
    findBookingById(id: string): Promise<Booking>;
    updateBooking(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    deleteBooking(id: string): Promise<void>;
    getTripSummary(tripId: string): Promise<{
        trip: Trip;
        totalDays: number;
        totalItineraryItems: number;
        totalBookings: number;
        totalBookingCost: number;
        currency: string;
        itinerary: Itinerary | null;
        bookingsByType: Record<string, Booking[]>;
    }>;
    private groupBookingsByType;
    findNotesByTrip(tripId: string): Promise<TripNote[]>;
    createNote(tripId: string, createNoteDto: CreateNoteDto): Promise<TripNote>;
    updateNote(noteId: string, updateNoteDto: UpdateNoteDto): Promise<TripNote>;
    deleteNote(noteId: string): Promise<void>;
}
//# sourceMappingURL=trip.service.d.ts.map