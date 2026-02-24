import { Repository } from 'typeorm';
import { Trip } from '../entities/trip.entity';
import { Booking } from '../entities/booking.entity';
import { TravelCompanion } from '../entities/travel-companion.entity';
import { TravelAnalyticsDto, TravelPatternDto, TravelGoalDto, MonthlySpendingDto, TopDestinationDto, TravelInsightDto } from './dto/analytics.dto';
export declare class AnalyticsService {
    private tripRepository;
    private bookingRepository;
    private companionRepository;
    constructor(tripRepository: Repository<Trip>, bookingRepository: Repository<Booking>, companionRepository: Repository<TravelCompanion>);
    getTravelAnalytics(userId: string, startDate: string, endDate: string): Promise<TravelAnalyticsDto>;
    private getMockTravelAnalytics;
    getTravelPatterns(userId: string, year: number): Promise<TravelPatternDto[]>;
    getTravelGoals(userId: string): Promise<TravelGoalDto[]>;
    getSpendingTrends(userId: string, months: number): Promise<MonthlySpendingDto[]>;
    getDestinationStats(userId: string, limit?: number): Promise<TopDestinationDto[]>;
    getCarbonFootprint(userId: string, year: number): Promise<{
        totalEmissions: number;
        byTransport: any[];
    }>;
    getTravelInsights(userId: string): Promise<TravelInsightDto[]>;
}
//# sourceMappingURL=analytics.service.d.ts.map