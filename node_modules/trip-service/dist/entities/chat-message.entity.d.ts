import { ChatSessionEntry } from './chat-session.entity';
export declare class ChatMessageEntry {
    id: string;
    sessionId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    metadata: any;
    session: ChatSessionEntry;
    timestamp: Date;
}
//# sourceMappingURL=chat-message.entity.d.ts.map