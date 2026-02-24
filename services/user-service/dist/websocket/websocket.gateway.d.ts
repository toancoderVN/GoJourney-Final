import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    private userSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(userId: string, client: Socket): void;
    handleLeave(userId: string, client: Socket): void;
    sendToUser(userId: string, event: string, data: any): void;
    sendToUsers(userIds: string[], event: string, data: any): void;
    broadcast(event: string, data: any): void;
}
//# sourceMappingURL=websocket.gateway.d.ts.map