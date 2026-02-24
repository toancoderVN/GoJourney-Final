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
exports.UpdateTravelPreferencesDto = exports.ConnectByUserIdDto = exports.UpdateCompanionDto = exports.AcceptInvitationDto = exports.CreateCompanionInvitationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const travel_companion_entity_1 = require("../entities/travel-companion.entity");
const companion_invitation_entity_1 = require("../entities/companion-invitation.entity");
class CreateCompanionInvitationDto {
    type;
    recipientEmail;
    recipientId;
    recipientName;
    message;
}
exports.CreateCompanionInvitationDto = CreateCompanionInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: companion_invitation_entity_1.InvitationType, description: 'Loại lời mời' }),
    (0, class_validator_1.IsEnum)(companion_invitation_entity_1.InvitationType),
    __metadata("design:type", String)
], CreateCompanionInvitationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email người nhận lời mời' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCompanionInvitationDto.prototype, "recipientEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID người dùng nhận lời mời' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCompanionInvitationDto.prototype, "recipientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên người nhận lời mời' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCompanionInvitationDto.prototype, "recipientName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tin nhắn kèm theo lời mời' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateCompanionInvitationDto.prototype, "message", void 0);
class AcceptInvitationDto {
    relationship;
    responseMessage;
}
exports.AcceptInvitationDto = AcceptInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: travel_companion_entity_1.RelationshipType, description: 'Loại mối quan hệ' }),
    (0, class_validator_1.IsEnum)(travel_companion_entity_1.RelationshipType),
    __metadata("design:type", String)
], AcceptInvitationDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tin nhắn phản hồi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], AcceptInvitationDto.prototype, "responseMessage", void 0);
class UpdateCompanionDto {
    relationship;
    foodPreferences;
    mobilityLevel;
    travelHabits;
    compatibilityScore;
}
exports.UpdateCompanionDto = UpdateCompanionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: travel_companion_entity_1.RelationshipType, description: 'Loại mối quan hệ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(travel_companion_entity_1.RelationshipType),
    __metadata("design:type", String)
], UpdateCompanionDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sở thích ẩm thực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCompanionDto.prototype, "foodPreferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: travel_companion_entity_1.MobilityLevel, description: 'Mức độ di chuyển' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(travel_companion_entity_1.MobilityLevel),
    __metadata("design:type", String)
], UpdateCompanionDto.prototype, "mobilityLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thói quen du lịch' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCompanionDto.prototype, "travelHabits", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điểm tương thích (0-100)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCompanionDto.prototype, "compatibilityScore", void 0);
class ConnectByUserIdDto {
    userId;
    relationship;
    message;
}
exports.ConnectByUserIdDto = ConnectByUserIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người dùng cần kết nối' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], ConnectByUserIdDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: travel_companion_entity_1.RelationshipType, description: 'Loại mối quan hệ' }),
    (0, class_validator_1.IsEnum)(travel_companion_entity_1.RelationshipType),
    __metadata("design:type", String)
], ConnectByUserIdDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tin nhắn kèm theo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ConnectByUserIdDto.prototype, "message", void 0);
class UpdateTravelPreferencesDto {
    foodStyle;
    activityLevel;
    budgetRange;
}
exports.UpdateTravelPreferencesDto = UpdateTravelPreferencesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phong cách ẩm thực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateTravelPreferencesDto.prototype, "foodStyle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['low', 'medium', 'high'], description: 'Mức độ hoạt động' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['low', 'medium', 'high']),
    __metadata("design:type", String)
], UpdateTravelPreferencesDto.prototype, "activityLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Khoảng ngân sách' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTravelPreferencesDto.prototype, "budgetRange", void 0);
//# sourceMappingURL=travel-companion.dto.js.map