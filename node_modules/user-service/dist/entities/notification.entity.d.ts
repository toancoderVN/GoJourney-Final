import { UserProfile } from './user-profile.entity';
export declare enum NotificationType {
    COMPANION_INVITATION = "companion_invitation",
    TRIP_INVITATION = "trip_invitation",
    COMPANION_ACCEPTED = "companion_accepted",
    TRIP_ACCEPTED = "trip_accepted"
}
export declare enum NotificationStatus {
    UNREAD = "unread",
    READ = "read",
    DISMISSED = "dismissed"
}
export declare class Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data: any;
    status: NotificationStatus;
    relatedEntityId: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserProfile;
}
//# sourceMappingURL=notification.entity.d.ts.map