import { User } from './user.entity';
export declare enum CompanionRelationship {
    FAMILY = "family",
    FRIEND = "friend",
    COLLEAGUE = "colleague"
}
export declare enum CompanionStatus {
    PENDING = "pending",
    CONNECTED = "connected",
    BLOCKED = "blocked"
}
export declare class TravelCompanion {
    id: string;
    userId: string;
    companionId: string;
    relationship: CompanionRelationship;
    status: CompanionStatus;
    sharedTrips: number;
    lastTripDate?: Date;
    aiPersonalNotes?: {
        compatibilityScore: number;
        travelPreferences: string[];
        conflictPoints: string[];
    };
    createdAt: Date;
    updatedAt: Date;
    user: User;
    companion: User;
}
//# sourceMappingURL=travel-companion.entity.d.ts.map