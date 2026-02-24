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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingConversation = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("./trip.entity");
/**
 * BookingConversation Entity
 * Lưu trữ lịch sử chat giữa AI Agent và khách sạn qua Zalo
 * Được tạo tự động khi AI Service hoàn thành booking
 */
let BookingConversation = class BookingConversation {
    id;
    // Link to trip (created after conversation completes)
    tripId;
    trip;
    // Session tracking from AI Service
    sessionId; // Maps to AI Service session
    aiServiceSessionId; // Optional backup reference
    // Zalo conversation tracking
    zaloAccountId; // User's Zalo account
    zaloConversationId; // Hotel's Zalo conversation ID
    // Hotel contact information
    hotelContact;
    // Original booking request from form (complete snapshot)
    bookingRequest;
    // Conversation messages (full chat history)
    messages;
    // Agent actions (AI decisions history)
    agentActions;
    // Payment information (if booking confirmed)
    paymentInfo;
    // FSM State (matches AI Service BookingState enum)
    state; // INPUT_READY, CONTACTING_HOTEL, NEGOTIATING, WAITING_USER_CONFIRM_PAYMENT, CONFIRMED, CANCELLED
    // Legacy metadata (keep for compatibility)
    metadata;
    // Timestamps
    createdAt;
    updatedAt;
    completedAt;
};
exports.BookingConversation = BookingConversation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BookingConversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], BookingConversation.prototype, "tripId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trip_entity_1.Trip, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tripId' }),
    __metadata("design:type", trip_entity_1.Trip)
], BookingConversation.prototype, "trip", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], BookingConversation.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BookingConversation.prototype, "aiServiceSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BookingConversation.prototype, "zaloAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BookingConversation.prototype, "zaloConversationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], BookingConversation.prototype, "hotelContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], BookingConversation.prototype, "bookingRequest", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], BookingConversation.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], BookingConversation.prototype, "agentActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BookingConversation.prototype, "paymentInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INPUT_READY' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], BookingConversation.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], BookingConversation.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BookingConversation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BookingConversation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], BookingConversation.prototype, "completedAt", void 0);
exports.BookingConversation = BookingConversation = __decorate([
    (0, typeorm_1.Entity)('booking_conversations')
], BookingConversation);
//# sourceMappingURL=booking-conversation.entity.js.map