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
exports.TravelGoalDto = exports.TravelPatternDto = exports.TravelAnalyticsDto = exports.TravelInsightDto = exports.MonthlyPatternsDto = exports.CarbonFootprintDto = exports.CompanionStatsDto = exports.TravelStylesDto = exports.TopDestinationDto = exports.MonthlySpendingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MonthlySpendingDto {
    month;
    amount;
    tripCount;
}
exports.MonthlySpendingDto = MonthlySpendingDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MonthlySpendingDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MonthlySpendingDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MonthlySpendingDto.prototype, "tripCount", void 0);
class TopDestinationDto {
    destination;
    visitCount;
    totalSpent;
    avgRating;
}
exports.TopDestinationDto = TopDestinationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TopDestinationDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TopDestinationDto.prototype, "visitCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TopDestinationDto.prototype, "totalSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TopDestinationDto.prototype, "avgRating", void 0);
class TravelStylesDto {
    budget;
    comfort;
    luxury;
    adventure;
}
exports.TravelStylesDto = TravelStylesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelStylesDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelStylesDto.prototype, "comfort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelStylesDto.prototype, "luxury", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelStylesDto.prototype, "adventure", void 0);
class CompanionStatsDto {
    solo;
    family;
    friends;
    colleagues;
}
exports.CompanionStatsDto = CompanionStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanionStatsDto.prototype, "solo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanionStatsDto.prototype, "family", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanionStatsDto.prototype, "friends", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CompanionStatsDto.prototype, "colleagues", void 0);
class CarbonFootprintDto {
    month;
    kgCO2;
}
exports.CarbonFootprintDto = CarbonFootprintDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CarbonFootprintDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CarbonFootprintDto.prototype, "kgCO2", void 0);
class MonthlyPatternsDto {
    month;
    count;
}
exports.MonthlyPatternsDto = MonthlyPatternsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MonthlyPatternsDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MonthlyPatternsDto.prototype, "count", void 0);
class TravelInsightDto {
    type;
    title;
    description;
    recommendation;
}
exports.TravelInsightDto = TravelInsightDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelInsightDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelInsightDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelInsightDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], TravelInsightDto.prototype, "recommendation", void 0);
class TravelAnalyticsDto {
    totalTrips;
    totalSpending;
    avgTripCost;
    countriesVisited;
    totalCarbonFootprint;
    monthlySpending;
    topDestinations;
    travelStyles;
    companionStats;
    carbonFootprint;
    monthlyPatterns;
    insights;
}
exports.TravelAnalyticsDto = TravelAnalyticsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelAnalyticsDto.prototype, "totalTrips", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelAnalyticsDto.prototype, "totalSpending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelAnalyticsDto.prototype, "avgTripCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelAnalyticsDto.prototype, "countriesVisited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelAnalyticsDto.prototype, "totalCarbonFootprint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MonthlySpendingDto] }),
    __metadata("design:type", Array)
], TravelAnalyticsDto.prototype, "monthlySpending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TopDestinationDto] }),
    __metadata("design:type", Array)
], TravelAnalyticsDto.prototype, "topDestinations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TravelStylesDto }),
    __metadata("design:type", TravelStylesDto)
], TravelAnalyticsDto.prototype, "travelStyles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CompanionStatsDto }),
    __metadata("design:type", CompanionStatsDto)
], TravelAnalyticsDto.prototype, "companionStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CarbonFootprintDto] }),
    __metadata("design:type", Array)
], TravelAnalyticsDto.prototype, "carbonFootprint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MonthlyPatternsDto] }),
    __metadata("design:type", Array)
], TravelAnalyticsDto.prototype, "monthlyPatterns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TravelInsightDto] }),
    __metadata("design:type", Array)
], TravelAnalyticsDto.prototype, "insights", void 0);
class TravelPatternDto {
    id;
    userId;
    patternType;
    pattern;
    frequency;
    confidence;
    recommendation;
    createdAt;
}
exports.TravelPatternDto = TravelPatternDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelPatternDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelPatternDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelPatternDto.prototype, "patternType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelPatternDto.prototype, "pattern", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelPatternDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelPatternDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelPatternDto.prototype, "recommendation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TravelPatternDto.prototype, "createdAt", void 0);
class TravelGoalDto {
    id;
    userId;
    title;
    targetValue;
    currentValue;
    unit;
    deadline;
    status;
    createdAt;
}
exports.TravelGoalDto = TravelGoalDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelGoalDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelGoalDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelGoalDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelGoalDto.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TravelGoalDto.prototype, "currentValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelGoalDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TravelGoalDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TravelGoalDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TravelGoalDto.prototype, "createdAt", void 0);
//# sourceMappingURL=analytics.dto.js.map