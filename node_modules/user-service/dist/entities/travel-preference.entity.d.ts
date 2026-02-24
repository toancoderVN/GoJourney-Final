import { UserProfile } from './user-profile.entity';
export declare enum TravelStyle {
    LUXURY = "luxury",
    BUDGET = "budget",
    COMFORT = "comfort",
    ADVENTURE = "adventure",
    FAMILY = "family",
    BUSINESS = "business",
    ROMANTIC = "romantic",
    CULTURAL = "cultural"
}
export declare enum HotelClass {
    ECONOMY = "economy",
    COMFORT = "comfort",
    PREMIUM = "premium",
    LUXURY = "luxury"
}
export declare enum TransportPreference {
    ECONOMY = "economy",
    BUSINESS = "business",
    FIRST = "first",
    ANY = "any"
}
export declare class TravelPreference {
    id: string;
    userProfileId: string;
    userProfile: UserProfile;
    travelStyle: TravelStyle;
    preferredHotelClass: HotelClass;
    preferredTransport: TransportPreference;
    preferredAirlines: string[];
    dietaryRestrictions: string[];
    accessibilityNeeds: string[];
    interests: string[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=travel-preference.entity.d.ts.map