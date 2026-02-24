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
exports.ItineraryItem = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const itinerary_entity_1 = require("./itinerary.entity");
const booking_entity_1 = require("./booking.entity");
let ItineraryItem = class ItineraryItem {
    id;
    itineraryId;
    type;
    name;
    description;
    location;
    startTime;
    endTime;
    duration; // minutes
    cost;
    bookingRequired;
    notes;
    dayIndex;
    sequence;
    createdAt;
    updatedAt;
    itinerary;
    booking;
};
exports.ItineraryItem = ItineraryItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItineraryItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItineraryItem.prototype, "itineraryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.ItineraryItemType,
    }),
    __metadata("design:type", String)
], ItineraryItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItineraryItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItineraryItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], ItineraryItem.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], ItineraryItem.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], ItineraryItem.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ItineraryItem.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ItineraryItem.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ItineraryItem.prototype, "bookingRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItineraryItem.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ItineraryItem.prototype, "dayIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ItineraryItem.prototype, "sequence", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItineraryItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItineraryItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => itinerary_entity_1.Itinerary, (itinerary) => itinerary.items),
    (0, typeorm_1.JoinColumn)({ name: 'itineraryId' }),
    __metadata("design:type", itinerary_entity_1.Itinerary)
], ItineraryItem.prototype, "itinerary", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_entity_1.Booking, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", booking_entity_1.Booking)
], ItineraryItem.prototype, "booking", void 0);
exports.ItineraryItem = ItineraryItem = __decorate([
    (0, typeorm_1.Entity)('itinerary_items')
], ItineraryItem);
//# sourceMappingURL=itinerary-item.entity.js.map