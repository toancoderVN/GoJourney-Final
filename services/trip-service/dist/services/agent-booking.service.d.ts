import { Repository } from 'typeorm';
import { Trip } from '../entities/trip.entity';
import { BookingConversation } from '../entities/booking-conversation.entity';
import { CreateTripFromBookingDto, ConversationResponseDto } from '../dto/agent-booking.dto';
export declare class AgentBookingService {
    private tripRepository;
    private conversationRepository;
    constructor(tripRepository: Repository<Trip>, conversationRepository: Repository<BookingConversation>);
    /**
     * Create Trip from AI Agent booking
     * Called by AI Service khi booking hoàn thành
     */
    createTripFromBooking(dto: CreateTripFromBookingDto): Promise<{
        trip: Trip;
        conversation: BookingConversation;
    }>;
    /**
     * Get conversation by tripId
     */
    getConversation(tripId: string): Promise<ConversationResponseDto>;
    /**
     * Update conversation state
     */
    updateConversationState(sessionId: string, state: string): Promise<void>;
    /**
     * Helper: Parse destination string
     */
    private parseDestination;
    /**
     * Helper: Extract interests from amenities
     */
    private extractInterests;
}
//# sourceMappingURL=agent-booking.service.d.ts.map