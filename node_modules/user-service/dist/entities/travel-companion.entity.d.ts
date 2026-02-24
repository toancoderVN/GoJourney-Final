import { UserProfile } from './user-profile.entity';
export declare enum RelationshipType {
    FAMILY = "family",
    FRIEND = "friend",
    COLLEAGUE = "colleague"
}
export declare enum ConnectionStatus {
    CONNECTED = "connected",
    PENDING = "pending",
    BLOCKED = "blocked"
}
export declare enum CurrentStatus {
    ONLINE = "online",
    TRAVELING = "traveling",
    OFFLINE = "offline"
}
export declare enum UserRole {
    PRIMARY = "primary",
    COMPANION = "companion"
}
export declare enum MobilityLevel {
    LOW_WALKING = "low_walking",
    MEDIUM_WALKING = "medium_walking",
    HIGH_WALKING = "high_walking"
}
export interface TravelPreferences {
    foodStyle: string[];
    activityLevel: 'low' | 'medium' | 'high';
    budgetRange: string;
}
export interface AIPersonalNotes {
    foodPreferences: string[];
    mobilityLevel: MobilityLevel;
    travelHabits: string[];
    conflictPoints?: string[];
    compatibilityScore?: number;
}
export declare class TravelCompanion {
    id: string;
    userId: string;
    user: UserProfile;
    companionId: string;
    companion: UserProfile;
    relationship: RelationshipType;
    status: ConnectionStatus;
    currentStatus: CurrentStatus;
    role: UserRole;
    sharedTrips: number;
    lastTripDate: Date;
    travelPreferences: TravelPreferences;
    aiPersonalNotes: AIPersonalNotes;
    invitationMessage: string;
    connectionDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=travel-companion.entity.d.ts.map