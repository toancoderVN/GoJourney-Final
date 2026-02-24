import { Trip } from './trip.entity';
import { ItineraryItem } from './itinerary-item.entity';
export declare class Itinerary {
    id: string;
    tripId: string;
    totalDistance: number;
    estimatedCost: number;
    createdAt: Date;
    updatedAt: Date;
    trip: Trip;
    items: ItineraryItem[];
}
//# sourceMappingURL=itinerary.entity.d.ts.map