import { RelationshipType, MobilityLevel } from '../entities/travel-companion.entity';
import { InvitationType } from '../entities/companion-invitation.entity';
export declare class CreateCompanionInvitationDto {
    type: InvitationType;
    recipientEmail?: string;
    recipientId?: string;
    recipientName?: string;
    message?: string;
}
export declare class AcceptInvitationDto {
    relationship: RelationshipType;
    responseMessage?: string;
}
export declare class UpdateCompanionDto {
    relationship?: RelationshipType;
    foodPreferences?: string[];
    mobilityLevel?: MobilityLevel;
    travelHabits?: string[];
    compatibilityScore?: number;
}
export declare class ConnectByUserIdDto {
    userId: string;
    relationship: RelationshipType;
    message?: string;
}
export declare class UpdateTravelPreferencesDto {
    foodStyle?: string[];
    activityLevel?: 'low' | 'medium' | 'high';
    budgetRange?: string;
}
//# sourceMappingURL=travel-companion.dto.d.ts.map