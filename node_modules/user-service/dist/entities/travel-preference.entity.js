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
exports.TravelPreference = exports.TransportPreference = exports.HotelClass = exports.TravelStyle = void 0;
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("./user-profile.entity");
var TravelStyle;
(function (TravelStyle) {
    TravelStyle["LUXURY"] = "luxury";
    TravelStyle["BUDGET"] = "budget";
    TravelStyle["COMFORT"] = "comfort";
    TravelStyle["ADVENTURE"] = "adventure";
    TravelStyle["FAMILY"] = "family";
    TravelStyle["BUSINESS"] = "business";
    TravelStyle["ROMANTIC"] = "romantic";
    TravelStyle["CULTURAL"] = "cultural";
})(TravelStyle || (exports.TravelStyle = TravelStyle = {}));
var HotelClass;
(function (HotelClass) {
    HotelClass["ECONOMY"] = "economy";
    HotelClass["COMFORT"] = "comfort";
    HotelClass["PREMIUM"] = "premium";
    HotelClass["LUXURY"] = "luxury";
})(HotelClass || (exports.HotelClass = HotelClass = {}));
var TransportPreference;
(function (TransportPreference) {
    TransportPreference["ECONOMY"] = "economy";
    TransportPreference["BUSINESS"] = "business";
    TransportPreference["FIRST"] = "first";
    TransportPreference["ANY"] = "any";
})(TransportPreference || (exports.TransportPreference = TransportPreference = {}));
let TravelPreference = class TravelPreference {
    id;
    userProfileId;
    userProfile;
    travelStyle;
    preferredHotelClass;
    preferredTransport;
    preferredAirlines;
    dietaryRestrictions;
    accessibilityNeeds;
    interests;
    createdAt;
    updatedAt;
};
exports.TravelPreference = TravelPreference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TravelPreference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TravelPreference.prototype, "userProfileId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_profile_entity_1.UserProfile, profile => profile.travelPreferences),
    (0, typeorm_1.JoinColumn)({ name: 'userProfileId' }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], TravelPreference.prototype, "userProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TravelStyle,
        default: TravelStyle.COMFORT
    }),
    __metadata("design:type", String)
], TravelPreference.prototype, "travelStyle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HotelClass,
        default: HotelClass.COMFORT
    }),
    __metadata("design:type", String)
], TravelPreference.prototype, "preferredHotelClass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TransportPreference,
        default: TransportPreference.ECONOMY
    }),
    __metadata("design:type", String)
], TravelPreference.prototype, "preferredTransport", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], TravelPreference.prototype, "preferredAirlines", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], TravelPreference.prototype, "dietaryRestrictions", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], TravelPreference.prototype, "accessibilityNeeds", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], TravelPreference.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TravelPreference.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TravelPreference.prototype, "updatedAt", void 0);
exports.TravelPreference = TravelPreference = __decorate([
    (0, typeorm_1.Entity)('travel_preferences')
], TravelPreference);
//# sourceMappingURL=travel-preference.entity.js.map