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
exports.TravelCompanion = exports.MobilityLevel = exports.UserRole = exports.CurrentStatus = exports.ConnectionStatus = exports.RelationshipType = void 0;
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("./user-profile.entity");
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["FAMILY"] = "family";
    RelationshipType["FRIEND"] = "friend";
    RelationshipType["COLLEAGUE"] = "colleague";
})(RelationshipType || (exports.RelationshipType = RelationshipType = {}));
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["CONNECTED"] = "connected";
    ConnectionStatus["PENDING"] = "pending";
    ConnectionStatus["BLOCKED"] = "blocked";
})(ConnectionStatus || (exports.ConnectionStatus = ConnectionStatus = {}));
var CurrentStatus;
(function (CurrentStatus) {
    CurrentStatus["ONLINE"] = "online";
    CurrentStatus["TRAVELING"] = "traveling";
    CurrentStatus["OFFLINE"] = "offline";
})(CurrentStatus || (exports.CurrentStatus = CurrentStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["PRIMARY"] = "primary";
    UserRole["COMPANION"] = "companion";
})(UserRole || (exports.UserRole = UserRole = {}));
var MobilityLevel;
(function (MobilityLevel) {
    MobilityLevel["LOW_WALKING"] = "low_walking";
    MobilityLevel["MEDIUM_WALKING"] = "medium_walking";
    MobilityLevel["HIGH_WALKING"] = "high_walking";
})(MobilityLevel || (exports.MobilityLevel = MobilityLevel = {}));
let TravelCompanion = class TravelCompanion {
    id;
    // User who owns this companion relationship
    userId;
    user;
    // The companion user
    companionId;
    companion;
    relationship;
    status;
    currentStatus;
    role;
    sharedTrips;
    lastTripDate;
    travelPreferences;
    aiPersonalNotes;
    invitationMessage;
    connectionDate;
    createdAt;
    updatedAt;
};
exports.TravelCompanion = TravelCompanion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TravelCompanion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_profile_entity_1.UserProfile, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], TravelCompanion.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companion_id', type: 'uuid' }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "companionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_profile_entity_1.UserProfile, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'companion_id' }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], TravelCompanion.prototype, "companion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RelationshipType,
        default: RelationshipType.FRIEND
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ConnectionStatus,
        default: ConnectionStatus.PENDING
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CurrentStatus,
        default: CurrentStatus.OFFLINE
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "currentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.COMPANION
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], TravelCompanion.prototype, "sharedTrips", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "lastTripDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], TravelCompanion.prototype, "travelPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], TravelCompanion.prototype, "aiPersonalNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "invitationMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "connectionDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "updatedAt", void 0);
exports.TravelCompanion = TravelCompanion = __decorate([
    (0, typeorm_1.Entity)('travel_companions')
], TravelCompanion);
//# sourceMappingURL=travel-companion.entity.js.map