export declare enum TripStatus {
    DRAFT = "draft",
    PLANNED = "planned",
    BOOKED = "booked",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class TravelHistory {
    id: string;
    userProfileId: string;
    tripName: string;
    destinations: string[];
    startDate: Date;
    endDate: Date;
    participants: number;
    totalCost: number;
    status: TripStatus;
    rating: number;
    review: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=travel-history.entity.d.ts.map