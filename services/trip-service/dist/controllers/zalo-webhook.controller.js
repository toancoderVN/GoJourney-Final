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
var ZaloWebhookController_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloWebhookController = void 0;
const common_1 = require("@nestjs/common");
const zalo_booking_service_1 = require("../services/zalo-booking.service");
let ZaloWebhookController = ZaloWebhookController_1 = class ZaloWebhookController {
    zaloBookingService;
    logger = new common_1.Logger(ZaloWebhookController_1.name);
    constructor(zaloBookingService) {
        this.zaloBookingService = zaloBookingService;
    }
    async handleWebhook(payload) {
        this.logger.log('Received Zalo ID webhook event');
        // Fire and forget - processing happens asynchronously
        this.zaloBookingService.handleIncomingMessage(payload);
        return { success: true };
    }
};
exports.ZaloWebhookController = ZaloWebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZaloWebhookController.prototype, "handleWebhook", null);
exports.ZaloWebhookController = ZaloWebhookController = ZaloWebhookController_1 = __decorate([
    (0, common_1.Controller)('webhooks/zalo'),
    __metadata("design:paramtypes", [typeof (_a = typeof zalo_booking_service_1.ZaloBookingService !== "undefined" && zalo_booking_service_1.ZaloBookingService) === "function" ? _a : Object])
], ZaloWebhookController);
//# sourceMappingURL=zalo-webhook.controller.js.map