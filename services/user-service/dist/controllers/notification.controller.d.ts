import { NotificationService } from '../services/notification.service';
import { NotificationStatus } from '../entities/notification.entity';
import { Request } from 'express';
import { NotificationGateway } from '../websocket/notification.gateway';
interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
    };
}
export declare class NotificationController {
    private readonly notificationService;
    private readonly notificationGateway;
    constructor(notificationService: NotificationService, notificationGateway: NotificationGateway);
    getNotifications(req: AuthenticatedRequest, status?: NotificationStatus): Promise<import("../entities/notification.entity").Notification[]>;
    getUnreadCount(req: AuthenticatedRequest): Promise<{
        count: number;
    }>;
    markAsRead(notificationId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    markAllAsRead(req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    deleteNotification(notificationId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    emitBookingPaymentRequest(payload: {
        userId: string;
        sessionId: string;
        agentResponse: any;
    }): Promise<{
        success: boolean;
    }>;
}
export {};
//# sourceMappingURL=notification.controller.d.ts.map