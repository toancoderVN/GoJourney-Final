import { Repository } from 'typeorm';
import { Notification, NotificationType, NotificationStatus } from '../entities/notification.entity';
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    createNotification(userId: string, type: NotificationType, title: string, message: string, data?: any, relatedEntityId?: string): Promise<Notification>;
    getUserNotifications(userId: string, status?: NotificationStatus): Promise<Notification[]>;
    markAsRead(notificationId: string, userId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
    deleteNotification(notificationId: string, userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
}
//# sourceMappingURL=notification.service.d.ts.map