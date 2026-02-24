import { TravelPreference } from './travel-preference.entity';
export interface NotificationPreferences {
    email: boolean;
    sms: boolean;
    push: boolean;
}
export interface UserPreferences {
    currency: string;
    language: string;
    timezone: string;
    notifications: NotificationPreferences;
}
export declare class UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: Date;
    avatar: string;
    preferences: UserPreferences;
    defaultBudgetMin: number;
    defaultBudgetMax: number;
    isActive: boolean;
    travelPreferences: TravelPreference[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user-profile.entity.d.ts.map