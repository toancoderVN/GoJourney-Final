export declare class MonthlySpendingDto {
    month: string;
    amount: number;
    tripCount: number;
}
export declare class TopDestinationDto {
    destination: string;
    visitCount: number;
    totalSpent: number;
    avgRating: number;
}
export declare class TravelStylesDto {
    budget: number;
    comfort: number;
    luxury: number;
    adventure: number;
}
export declare class CompanionStatsDto {
    solo: number;
    family: number;
    friends: number;
    colleagues: number;
}
export declare class CarbonFootprintDto {
    month: string;
    kgCO2: number;
}
export declare class MonthlyPatternsDto {
    month: string;
    count: number;
}
export declare class TravelInsightDto {
    type: 'positive' | 'negative' | 'neutral';
    title: string;
    description: string;
    recommendation?: string;
}
export declare class TravelAnalyticsDto {
    totalTrips: number;
    totalSpending: number;
    avgTripCost: number;
    countriesVisited: number;
    totalCarbonFootprint: number;
    monthlySpending: MonthlySpendingDto[];
    topDestinations: TopDestinationDto[];
    travelStyles: TravelStylesDto;
    companionStats: CompanionStatsDto;
    carbonFootprint: CarbonFootprintDto[];
    monthlyPatterns: MonthlyPatternsDto[];
    insights: TravelInsightDto[];
}
export declare class TravelPatternDto {
    id: string;
    userId: string;
    patternType: 'seasonal' | 'budget' | 'destination' | 'duration';
    pattern: string;
    frequency: number;
    confidence: number;
    recommendation: string;
    createdAt: Date;
}
export declare class TravelGoalDto {
    id: string;
    userId: string;
    title: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    deadline: Date;
    status: 'active' | 'completed' | 'paused';
    createdAt: Date;
}
//# sourceMappingURL=analytics.dto.d.ts.map