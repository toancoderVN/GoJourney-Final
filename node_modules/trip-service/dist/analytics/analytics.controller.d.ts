import { AnalyticsService } from './analytics.service';
import { TravelAnalyticsDto, TravelPatternDto, TravelGoalDto } from './dto/analytics.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getTravelAnalytics(userId: string, startDate: string, endDate: string): Promise<TravelAnalyticsDto>;
    getTravelPatterns(userId: string, year?: string): Promise<TravelPatternDto[]>;
    getTravelGoals(userId: string): Promise<TravelGoalDto[]>;
    getSpendingTrends(userId: string, months?: string): Promise<import("./dto/analytics.dto").MonthlySpendingDto[]>;
    getDestinationStats(userId: string, limit?: string): Promise<import("./dto/analytics.dto").TopDestinationDto[]>;
    getCarbonFootprint(userId: string, year?: string): Promise<{
        totalEmissions: number;
        byTransport: any[];
    }>;
    getTravelInsights(userId: string): Promise<import("./dto/analytics.dto").TravelInsightDto[]>;
}
//# sourceMappingURL=analytics.controller.d.ts.map