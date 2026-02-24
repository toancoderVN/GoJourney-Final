import { ChatService } from '../services/chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createSession(body: {
        userId: string;
        title?: string;
    }): Promise<import("@common-types/chat").ChatSession>;
    getUserSessions(userId: string): Promise<import("@common-types/chat").ChatSession[]>;
    getSession(id: string, userId: string): Promise<import("@common-types/chat").ChatSession>;
    addMessage(sessionId: string, body: {
        role: string;
        content: string;
        metadata?: any;
    }): Promise<import("@common-types/chat").ChatMessage>;
    updateSession(id: string, body: {
        userId: string;
        title: string;
    }): Promise<import("@common-types/chat").ChatSession>;
    deleteSession(id: string, body: {
        userId: string;
    }): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=chat.controller.d.ts.map