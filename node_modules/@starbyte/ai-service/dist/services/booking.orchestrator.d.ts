import { AzureAIService } from './azure-ai.service';
export declare class BookingOrchestrator {
    private azureAIService;
    private conversationStates;
    private conversationContext;
    constructor(azureAIService?: AzureAIService);
    hasActiveSession(sessionId: string): boolean;
    handleBookingRequest(sessionId: string, bookingRequest: any, history?: any[]): Promise<any>;
    getContext(sessionId: string): any;
    private executeAction;
}
export declare const bookingOrchestrator: BookingOrchestrator;
//# sourceMappingURL=booking.orchestrator.d.ts.map