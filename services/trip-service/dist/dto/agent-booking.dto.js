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
exports.CreateTripFromBookingResponseDto = exports.ConversationResponseDto = exports.CreateTripFromBookingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for creating Trip from AI Agent booking
 * Called by AI Service when booking is complete
 */
class CreateTripFromBookingDto {
    sessionId;
    userId;
    bookingData;
}
exports.CreateTripFromBookingDto = CreateTripFromBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AI Service session ID (unique)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTripFromBookingDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User UUID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTripFromBookingDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Complete booking data from AI Service' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateTripFromBookingDto.prototype, "bookingData", void 0);
/**
 * Response พื้นฐาC for conversation queries
 */
class ConversationResponseDto {
    conversationId;
    sessionId;
    messages;
    agentActions;
    hotelContact;
    state;
    timeline;
}
exports.ConversationResponseDto = ConversationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ConversationResponseDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ConversationResponseDto.prototype, "agentActions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ConversationResponseDto.prototype, "hotelContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ConversationResponseDto.prototype, "timeline", void 0);
/**
 * Response khi tạo trip từ booking
 */
class CreateTripFromBookingResponseDto {
    success;
    tripId;
    bookingConversationId;
    message;
}
exports.CreateTripFromBookingResponseDto = CreateTripFromBookingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateTripFromBookingResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripFromBookingResponseDto.prototype, "tripId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripFromBookingResponseDto.prototype, "bookingConversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTripFromBookingResponseDto.prototype, "message", void 0);
//# sourceMappingURL=agent-booking.dto.js.map