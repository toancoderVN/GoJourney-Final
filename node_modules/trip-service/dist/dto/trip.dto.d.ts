import { TripStatus } from '../types';
export declare class CreateTripDto {
    userId: string;
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    numberOfPeople?: number;
    budgetMin?: number;
    budgetMax?: number;
    currency?: string;
    preferences?: any;
}
export declare class UpdateTripDto {
    name?: string;
    description?: string;
    status?: TripStatus;
    startDate?: string;
    endDate?: string;
    numberOfPeople?: number;
    budgetMin?: number;
    budgetMax?: number;
    currency?: string;
    preferences?: any;
    budget?: any;
}
export declare class CreateItineraryDto {
    tripId: string;
    dayIndex: number;
    placeId: string;
    placeName?: string;
    startTime?: string;
    endTime?: string;
    notes?: string;
    estimatedCost?: number;
}
//# sourceMappingURL=trip.dto.d.ts.map