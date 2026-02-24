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
var BookingConversationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingConversationController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_conversation_entity_1 = require("../entities/booking-conversation.entity");
let BookingConversationController = BookingConversationController_1 = class BookingConversationController {
    conversationRepo;
    logger = new common_1.Logger(BookingConversationController_1.name);
    constructor(conversationRepo) {
        this.conversationRepo = conversationRepo;
    }
    async findAll() {
        this.logger.log('Fetching all booking conversations');
        const items = await this.conversationRepo.find({
            order: { updatedAt: 'DESC' }
        });
        return items;
    }
};
exports.BookingConversationController = BookingConversationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingConversationController.prototype, "findAll", null);
exports.BookingConversationController = BookingConversationController = BookingConversationController_1 = __decorate([
    (0, common_1.Controller)('bookings/conversations'),
    __param(0, (0, typeorm_1.InjectRepository)(booking_conversation_entity_1.BookingConversation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingConversationController);
//# sourceMappingURL=booking-conversation.controller.js.map