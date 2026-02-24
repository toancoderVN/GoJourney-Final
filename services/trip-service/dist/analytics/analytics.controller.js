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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const analytics_dto_1 = require("./dto/analytics.dto");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getTravelAnalytics(userId, startDate, endDate) {
        return this.analyticsService.getTravelAnalytics(userId, startDate, endDate);
    }
    async getTravelPatterns(userId, year = '2024') {
        return this.analyticsService.getTravelPatterns(userId, parseInt(year));
    }
    async getTravelGoals(userId) {
        return this.analyticsService.getTravelGoals(userId);
    }
    async getSpendingTrends(userId, months = '12') {
        return this.analyticsService.getSpendingTrends(userId, parseInt(months));
    }
    async getDestinationStats(userId, limit = '10') {
        return this.analyticsService.getDestinationStats(userId, parseInt(limit));
    }
    async getCarbonFootprint(userId, year = '2024') {
        return this.analyticsService.getCarbonFootprint(userId, parseInt(year));
    }
    async getTravelInsights(userId) {
        return this.analyticsService.getTravelInsights(userId);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('travel/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get travel analytics for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Travel analytics retrieved successfully', type: analytics_dto_1.TravelAnalyticsDto }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTravelAnalytics", null);
__decorate([
    (0, common_1.Get)('patterns/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get travel patterns for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Travel patterns retrieved successfully', type: [analytics_dto_1.TravelPatternDto] }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTravelPatterns", null);
__decorate([
    (0, common_1.Get)('goals/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get travel goals for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Travel goals retrieved successfully', type: [analytics_dto_1.TravelGoalDto] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTravelGoals", null);
__decorate([
    (0, common_1.Get)('spending-trends/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get spending trends for user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('months')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getSpendingTrends", null);
__decorate([
    (0, common_1.Get)('destinations/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get destination statistics for user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDestinationStats", null);
__decorate([
    (0, common_1.Get)('carbon-footprint/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get carbon footprint analytics for user' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCarbonFootprint", null);
__decorate([
    (0, common_1.Get)('insights/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI-generated travel insights for user' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTravelInsights", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map