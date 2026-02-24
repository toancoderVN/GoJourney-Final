import { TripStatus } from '../types';
import { User } from './user.entity';
import { Itinerary } from './itinerary.entity';
import { Booking } from './booking.entity';
export declare class Trip {
    id: string;
    userId: string;
    name: string;
    status: TripStatus;
    startDate: Date;
    endDate: Date;
    destination: {
        country: string;
        city: string;
        region?: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    participants: number;
    budget: {
        total: number;
        currency: string;
        breakdown: {
            flights: number;
            accommodation: number;
            activities: number;
            food: number;
            transport: number;
            other: number;
        };
    };
    preferences: {
        pace: 'relaxed' | 'moderate' | 'packed';
        interests: string[];
        mustSee: string[];
        avoidances: string[];
    };
    source: 'manual' | 'agent_booking' | 'api_import';
    agent_booking_id: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    itinerary: Itinerary;
    bookings: Booking[];
}
//# sourceMappingURL=trip.entity.d.ts.map