/**
 * Trip Integration Service
 * Connects AI Service to Trip Service
 * Saves completed bookings to Trip database
 */
export declare class TripIntegrationService {
    private tripServiceBaseUrl;
    constructor();
    /**
     * Save completed booking to Trip Service
     * Called when BookingState reaches CONFIRMED
     */
    saveTripAfterBooking(sessionId: string): Promise<{
        tripId: string;
        conversationId: string;
    } | null>;
    /**
     * Extract payment info from session context or history
     * Priority: paymentInfo > agent actions > hotel messages > form budget
     */
    private extractPaymentInfo;
    /**
     * Extract price per night from conversation history
     * Looks for patterns like "600k", "500.000", "1tr", etc.
     */
    private extractPriceFromHistory;
    /**
     * Calculate number of nights
     */
    private calculateNights;
    /**
     * Save failed requests to dead letter queue for manual processing
     */
    private saveToDeadLetterQueue;
    /**
     * Retry failed trip saves from DLQ
     */
    retryFromDeadLetterQueue(): Promise<void>;
}
export declare const tripIntegrationService: TripIntegrationService;
//# sourceMappingURL=trip-integration.service.d.ts.map