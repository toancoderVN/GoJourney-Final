import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface UserSocket extends Socket {
    userId?: string;
}
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    private userConnections;
    private socketUsers;
    handleConnection(client: UserSocket): void;
    handleDisconnect(client: UserSocket): void;
    handleJoinRoom(data: {
        userId: string;
    }, client: UserSocket): {
        status: string;
        message: string;
    };
    sendNotificationToUser(userId: string, notification: any): void;
    sendInvitationNotification(userId: string, invitation: any): void;
    broadcastInvitationAccepted(userIds: string[], data: any): void;
    getOnlineUsersCount(): number;
    isUserOnline(userId: string): boolean;
    broadcastUserStatusChange(userId: string, status: 'online' | 'offline'): void;
    getOnlineUserIds(): string[];
}
export {};
//# sourceMappingURL=notification.gateway.d.ts.map