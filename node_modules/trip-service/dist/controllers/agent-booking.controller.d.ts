import { AgentBookingService } from '../services/agent-booking.service';
import { CreateTripFromBookingDto, CreateTripFromBookingResponseDto, ConversationResponseDto } from '../dto/agent-booking.dto';
export declare class AgentBookingController {
    private readonly agentBookingService;
    constructor(agentBookingService: AgentBookingService);
    /**
     * Create Trip from AI Agent booking
     * Called by AI Service when booking is confirmed/cancelled
     */
    createFromBooking(dto: CreateTripFromBookingDto): Promise<CreateTripFromBookingResponseDto>;
    /**
     * Get conversation history for a trip
     * Returns null if trip is not from agent booking
     */
    getConversation(tripId: string): Promise<ConversationResponseDto>;
}
//# sourceMappingURL=agent-booking.controller.d.ts.map