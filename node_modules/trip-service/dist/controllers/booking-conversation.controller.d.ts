import { Repository } from 'typeorm';
import { BookingConversation } from '../entities/booking-conversation.entity';
export declare class BookingConversationController {
    private conversationRepo;
    private readonly logger;
    constructor(conversationRepo: Repository<BookingConversation>);
    findAll(): Promise<BookingConversation[]>;
}
//# sourceMappingURL=booking-conversation.controller.d.ts.map