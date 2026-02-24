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
exports.TravelCompanion = exports.CompanionStatus = exports.CompanionRelationship = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var CompanionRelationship;
(function (CompanionRelationship) {
    CompanionRelationship["FAMILY"] = "family";
    CompanionRelationship["FRIEND"] = "friend";
    CompanionRelationship["COLLEAGUE"] = "colleague";
})(CompanionRelationship || (exports.CompanionRelationship = CompanionRelationship = {}));
var CompanionStatus;
(function (CompanionStatus) {
    CompanionStatus["PENDING"] = "pending";
    CompanionStatus["CONNECTED"] = "connected";
    CompanionStatus["BLOCKED"] = "blocked";
})(CompanionStatus || (exports.CompanionStatus = CompanionStatus = {}));
let TravelCompanion = class TravelCompanion {
    id;
    userId;
    companionId;
    relationship;
    status;
    sharedTrips;
    lastTripDate;
    aiPersonalNotes;
    createdAt;
    updatedAt;
    user;
    companion;
};
exports.TravelCompanion = TravelCompanion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TravelCompanion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "companionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CompanionRelationship,
        default: CompanionRelationship.FRIEND,
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CompanionStatus,
        default: CompanionStatus.PENDING,
    }),
    __metadata("design:type", String)
], TravelCompanion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TravelCompanion.prototype, "sharedTrips", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "lastTripDate", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TravelCompanion.prototype, "aiPersonalNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TravelCompanion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], TravelCompanion.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'companionId' }),
    __metadata("design:type", user_entity_1.User)
], TravelCompanion.prototype, "companion", void 0);
exports.TravelCompanion = TravelCompanion = __decorate([
    (0, typeorm_1.Entity)('travel_companions')
], TravelCompanion);
//# sourceMappingURL=travel-companion.entity.js.map