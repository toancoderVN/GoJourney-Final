"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let NotificationGateway = NotificationGateway_1 = class NotificationGateway {
    server;
    logger = new common_1.Logger(NotificationGateway_1.name);
    userConnections = new Map(); // userId -> socketId
    socketUsers = new Map(); // socketId -> userId
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        const userId = this.socketUsers.get(client.id);
        if (userId) {
            this.userConnections.delete(userId);
            this.socketUsers.delete(client.id);
            this.logger.log(`User ${userId} disconnected`);
            // Broadcast user status change to companions
            this.broadcastUserStatusChange(userId, 'offline');
        }
    }
    handleJoinRoom(data, client) {
        const { userId } = data;
        console.log(`🔔 [NotificationGateway] User ${userId} joining with socket ${client.id}`);
        // Remove old connection if exists
        const oldSocketId = this.userConnections.get(userId);
        if (oldSocketId) {
            this.socketUsers.delete(oldSocketId);
            console.log(`🔔 [NotificationGateway] Removed old connection for user ${userId}`);
        }
        // Store new connection
        this.userConnections.set(userId, client.id);
        this.socketUsers.set(client.id, userId);
        client.userId = userId;
        // Join user-specific room
        client.join(`user:${userId}`);
        console.log(`🔔 [NotificationGateway] User ${userId} joined successfully. Total users: ${this.userConnections.size}`);
        // Broadcast user status change to companions
        this.broadcastUserStatusChange(userId, 'online');
        return { status: 'success', message: 'Joined successfully' };
    }
    // Send notification to specific user
    sendNotificationToUser(userId, notification) {
        console.log(`🔔 [NotificationGateway] Sending notification to user ${userId}:`, notification);
        console.log(`🔔 [NotificationGateway] User connected?`, this.userConnections.has(userId));
        console.log(`🔔 [NotificationGateway] Total connected users:`, this.userConnections.size);
        // Choose the right event based on notification type
        if (notification.type === 'companion_invitation') {
            this.server.to(`user:${userId}`).emit('new_invitation', notification);
        }
        else {
            this.server.to(`user:${userId}`).emit('notification', notification);
        }
    }
    // Send invitation notification
    sendInvitationNotification(userId, invitation) {
        this.logger.log(`Sending invitation to user ${userId}:`, invitation);
        this.server.to(`user:${userId}`).emit('new_invitation', invitation);
    }
    // Broadcast invitation accepted
    broadcastInvitationAccepted(userIds, data) {
        userIds.forEach(userId => {
            this.logger.log(`Broadcasting invitation accepted to user ${userId}`);
            this.server.to(`user:${userId}`).emit('invitation_accepted', data);
        });
    }
    // Get online users count
    getOnlineUsersCount() {
        return this.userConnections.size;
    }
    // Check if user is online
    isUserOnline(userId) {
        const isOnline = this.userConnections.has(userId);
        console.log(`🔍 [Gateway] Checking if user ${userId} is online: ${isOnline}`);
        console.log(`🔍 [Gateway] Current online users:`, Array.from(this.userConnections.keys()));
        return isOnline;
    }
    // Broadcast user status change to all companions
    broadcastUserStatusChange(userId, status) {
        this.logger.log(`Broadcasting status change for user ${userId}: ${status}`);
        // Emit to all connected users (they can filter on frontend if they're companions)
        this.server.emit('user_status_change', {
            userId,
            status,
            timestamp: new Date().toISOString()
        });
    }
    // Get all online user IDs
    getOnlineUserIds() {
        return Array.from(this.userConnections.keys());
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleJoinRoom", null);
exports.NotificationGateway = NotificationGateway = NotificationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
            credentials: true,
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'user-id'],
        },
        allowEIO3: true,
        namespace: '/',
    })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map