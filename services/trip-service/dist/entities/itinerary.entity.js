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
exports.Itinerary = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("./trip.entity");
const itinerary_item_entity_1 = require("./itinerary-item.entity");
let Itinerary = class Itinerary {
    id;
    tripId;
    totalDistance;
    estimatedCost;
    createdAt;
    updatedAt;
    trip;
    items;
};
exports.Itinerary = Itinerary;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Itinerary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Itinerary.prototype, "tripId", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], Itinerary.prototype, "totalDistance", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Itinerary.prototype, "estimatedCost", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Itinerary.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Itinerary.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trip_entity_1.Trip, (trip) => trip.itinerary),
    (0, typeorm_1.JoinColumn)({ name: 'tripId' }),
    __metadata("design:type", trip_entity_1.Trip)
], Itinerary.prototype, "trip", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itinerary_item_entity_1.ItineraryItem, (item) => item.itinerary, { cascade: true }),
    __metadata("design:type", Array)
], Itinerary.prototype, "items", void 0);
exports.Itinerary = Itinerary = __decorate([
    (0, typeorm_1.Entity)('itineraries')
], Itinerary);
//# sourceMappingURL=itinerary.entity.js.map