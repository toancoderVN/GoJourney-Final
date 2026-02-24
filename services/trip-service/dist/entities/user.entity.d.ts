import { TravelStyle, HotelClass, AccessibilityNeeds } from '../types';
import { Trip } from './trip.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    googleId?: string;
    facebookId?: string;
    preferences: {
        budgetRange: {
            min: number;
            max: number;
            currency: string;
        };
        travelStyle: TravelStyle[];
        preferredAirlines?: string[];
        hotelClass: HotelClass;
        dietaryRestrictions?: string[];
        accessibility?: AccessibilityNeeds[];
        language: string;
        currency: string;
        timezone: string;
    };
    isActive: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    trips: Trip[];
}
//# sourceMappingURL=user.entity.d.ts.map