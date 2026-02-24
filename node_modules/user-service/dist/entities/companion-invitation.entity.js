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
exports.CompanionInvitation = exports.InvitationStatus = exports.InvitationType = void 0;
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("./user-profile.entity");
var InvitationType;
(function (InvitationType) {
    InvitationType["EMAIL"] = "email";
    InvitationType["LINK"] = "link";
    InvitationType["USER_ID"] = "user_id";
    InvitationType["SYSTEM"] = "system";
})(InvitationType || (exports.InvitationType = InvitationType = {}));
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "pending";
    InvitationStatus["ACCEPTED"] = "accepted";
    InvitationStatus["DECLINED"] = "declined";
    InvitationStatus["EXPIRED"] = "expired";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
let CompanionInvitation = class CompanionInvitation {
    id;
    // User who sent the invitation
    sender;
    senderId;
    // User who received the invitation (if known)
    recipient;
    recipientId;
    recipientEmail;
    recipientName;
    type;
    status;
    message;
    inviteCode; // For link-based invitations
    tripId; // For trip-specific invitations
    expiresAt;
    respondedAt;
    createdAt;
    updatedAt;
};
exports.CompanionInvitation = CompanionInvitation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_profile_entity_1.UserProfile),
    (0, typeorm_1.JoinColumn)({ name: 'sender_id' }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], CompanionInvitation.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sender_id' }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_profile_entity_1.UserProfile, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'recipient_id' }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], CompanionInvitation.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recipient_id', nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "recipientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "recipientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "recipientName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvitationType,
        default: InvitationType.EMAIL
    }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvitationStatus,
        default: InvitationStatus.PENDING
    }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "inviteCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trip_id', nullable: true }),
    __metadata("design:type", String)
], CompanionInvitation.prototype, "tripId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CompanionInvitation.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CompanionInvitation.prototype, "respondedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CompanionInvitation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CompanionInvitation.prototype, "updatedAt", void 0);
exports.CompanionInvitation = CompanionInvitation = __decorate([
    (0, typeorm_1.Entity)('companion_invitations')
], CompanionInvitation);
//# sourceMappingURL=companion-invitation.entity.js.map