import { ItineraryItemType } from '../types';
import { Itinerary } from './itinerary.entity';
import { Booking } from './booking.entity';
export declare class ItineraryItem {
    id: string;
    itineraryId: string;
    type: ItineraryItemType;
    name: string;
    description?: string;
    location: {
        name: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        placeId?: string;
        rating?: number;
        photos?: string[];
    };
    startTime: Date;
    endTime: Date;
    duration: number;
    cost: number;
    bookingRequired: boolean;
    notes?: string;
    dayIndex: number;
    sequence: number;
    createdAt: Date;
    updatedAt: Date;
    itinerary: Itinerary;
    booking?: Booking;
}
//# sourceMappingURL=itinerary-item.entity.d.ts.map