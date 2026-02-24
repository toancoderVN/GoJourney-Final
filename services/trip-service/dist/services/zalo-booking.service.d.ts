import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BookingConversation } from '../entities/booking-conversation.entity';
import { Booking } from '../entities/booking.entity';
import { ChatService } from './chat.service';
export declare class ZaloBookingService {
    private conversationRepo;
    private bookingRepo;
    private configService;
    private chatService;
    private readonly logger;
    private aiServiceUrl;
    constructor(conversationRepo: Repository<BookingConversation>, bookingRepo: Repository<Booking>, configService: ConfigService, chatService: ChatService);
    /**
     * Handle incoming Zalo message from Webhook
     */
    handleIncomingMessage(payload: any): Promise<void>;
    /**
     * Call AI Service to classify intent
     */
    private classifyIntent;
    /**
     * Call AI Service to generate response
     */
    private generateResponse;
    /**
     * Send message to Zalo via AI Service Gateway
     */
    private sendZaloMessage;
    /**
     * Sync BookingConversation to standard ChatSession
     * so it can be viewed in the Chat UI
     */
    private syncWithChatSession;
}
//# sourceMappingURL=zalo-booking.service.d.ts.map