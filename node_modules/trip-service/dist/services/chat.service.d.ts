import { Repository } from 'typeorm';
import { ChatSessionEntry } from '../entities/chat-session.entity';
import { ChatMessageEntry } from '../entities/chat-message.entity';
import { ChatSession, ChatMessage } from '@libs/common-types';
export declare class ChatService {
    private chatSessionRepository;
    private chatMessageRepository;
    constructor(chatSessionRepository: Repository<ChatSessionEntry>, chatMessageRepository: Repository<ChatMessageEntry>);
    ensureSystemSession(id: string, title: string): Promise<ChatSession>;
    createSession(userId: string, title?: string): Promise<ChatSession>;
    getUserSessions(userId: string): Promise<ChatSession[]>;
    getSession(id: string, userId: string): Promise<ChatSession>;
    getMessages(sessionId: string): Promise<ChatMessage[]>;
    addMessage(sessionId: string, role: string, content: string, metadata?: any): Promise<ChatMessage>;
    updateSessionTitle(id: string, userId: string, title: string): Promise<ChatSession>;
    deleteSession(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=chat.service.d.ts.map