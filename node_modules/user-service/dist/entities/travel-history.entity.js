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
exports.TravelHistory = exports.TripStatus = void 0;
const typeorm_1 = require("typeorm");
var TripStatus;
(function (TripStatus) {
    TripStatus["DRAFT"] = "draft";
    TripStatus["PLANNED"] = "planned";
    TripStatus["BOOKED"] = "booked";
    TripStatus["COMPLETED"] = "completed";
    TripStatus["CANCELLED"] = "cancelled";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
let TravelHistory = class TravelHistory {
    id;
    userProfileId;
    tripName;
    destinations;
    startDate;
    endDate;
    participants;
    totalCost;
    status;
    rating; // 1-5 stars
    review;
    metadata; // Trip details, bookings, etc.
    createdAt;
    updatedAt;
};
exports.TravelHistory = TravelHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TravelHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TravelHistory.prototype, "userProfileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TravelHistory.prototype, "tripName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], TravelHistory.prototype, "destinations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TravelHistory.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TravelHistory.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TravelHistory.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TravelHistory.prototype, "totalCost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TripStatus,
        default: TripStatus.DRAFT
    }),
    __metadata("design:type", String)
], TravelHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], TravelHistory.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TravelHistory.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], TravelHistory.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TravelHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TravelHistory.prototype, "updatedAt", void 0);
exports.TravelHistory = TravelHistory = __decorate([
    (0, typeorm_1.Entity)('travel_history')
], TravelHistory);
//# sourceMappingURL=travel-history.entity.js.map