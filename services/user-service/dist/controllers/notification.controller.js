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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("../services/notification.service");
const notification_entity_1 = require("../entities/notification.entity");
const notification_gateway_1 = require("../websocket/notification.gateway");
let NotificationController = class NotificationController {
    notificationService;
    notificationGateway;
    constructor(notificationService, notificationGateway // Properly typed
    ) {
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
    }
    async getNotifications(req, status) {
        const userId = req.user?.id || req.headers['user-id'] || '550e8400-e29b-41d4-a716-446655440000';
        return this.notificationService.getUserNotifications(userId, status);
    }
    async getUnreadCount(req) {
        const userId = req.user?.id || req.headers['user-id'] || '550e8400-e29b-41d4-a716-446655440000';
        const count = await this.notificationService.getUnreadCount(userId);
        return { count };
    }
    async markAsRead(notificationId, req) {
        const userId = req.user?.id || req.headers['user-id'] || '550e8400-e29b-41d4-a716-446655440000';
        await this.notificationService.markAsRead(notificationId, userId);
        return { message: 'Đã đánh dấu đã đọc' };
    }
    async markAllAsRead(req) {
        const userId = req.user?.id || req.headers['user-id'] || '550e8400-e29b-41d4-a716-446655440000';
        await this.notificationService.markAllAsRead(userId);
        return { message: 'Đã đánh dấu tất cả đã đọc' };
    }
    async deleteNotification(notificationId, req) {
        const userId = req.user?.id || req.headers['user-id'] || '550e8400-e29b-41d4-a716-446655440000';
        await this.notificationService.deleteNotification(notificationId, userId);
        return { message: 'Đã xóa thông báo' };
    }
    async emitBookingPaymentRequest(payload) {
        const { userId, sessionId, agentResponse } = payload;
        console.log(`[NotificationController] 💰 Emitting payment request to user ${userId}`);
        if (this.notificationGateway) {
            this.notificationGateway.sendNotificationToUser(userId, {
                type: 'booking_payment_request',
                sessionId,
                ...agentResponse
            });
        }
        return { success: true };
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thông báo' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: notification_entity_1.NotificationStatus, required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách thông báo' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy số thông báo chưa đọc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Số thông báo chưa đọc' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Put)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu thông báo đã đọc' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã đánh dấu đã đọc' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Put)('mark-all-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu tất cả thông báo đã đọc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã đánh dấu tất cả đã đọc' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa thông báo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID thông báo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã xóa thông báo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteNotification", null);
__decorate([
    (0, common_1.Post)('emit-booking-payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "emitBookingPaymentRequest", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway // Properly typed
    ])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map