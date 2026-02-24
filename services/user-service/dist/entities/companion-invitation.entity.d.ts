import { UserProfile } from './user-profile.entity';
export declare enum InvitationType {
    EMAIL = "email",
    LINK = "link",
    USER_ID = "user_id",
    SYSTEM = "system"
}
export declare enum InvitationStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DECLINED = "declined",
    EXPIRED = "expired"
}
export declare class CompanionInvitation {
    id: string;
    sender: UserProfile;
    senderId: string;
    recipient: UserProfile;
    recipientId: string;
    recipientEmail: string;
    recipientName: string;
    type: InvitationType;
    status: InvitationStatus;
    message: string;
    inviteCode: string;
    tripId: string;
    expiresAt: Date;
    respondedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=companion-invitation.entity.d.ts.map