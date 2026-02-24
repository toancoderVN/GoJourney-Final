import { TravelStyle, HotelClass, TransportPreference } from '../entities/travel-preference.entity';
export declare class NotificationPreferencesDto {
    email: boolean;
    sms: boolean;
    push: boolean;
}
export declare class UserPreferencesDto {
    currency: string;
    language: string;
    timezone: string;
    notifications: NotificationPreferencesDto;
}
export declare class CreateUserProfileDto {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    avatar?: string;
    preferences?: UserPreferencesDto;
    defaultBudgetMin?: number;
    defaultBudgetMax?: number;
}
export declare class UpdateUserProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    avatar?: string;
    preferences?: UserPreferencesDto;
    defaultBudgetMin?: number;
    defaultBudgetMax?: number;
}
export declare class CreateTravelPreferenceDto {
    userProfileId: string;
    travelStyle: TravelStyle;
    preferredHotelClass: HotelClass;
    preferredTransport: TransportPreference;
    preferredAirlines?: string[];
    dietaryRestrictions?: string[];
    accessibilityNeeds?: string[];
    interests?: string[];
}
//# sourceMappingURL=user.dto.d.ts.map