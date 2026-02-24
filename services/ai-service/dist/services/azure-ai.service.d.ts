export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export interface ChatCompletionResponse {
    id: string;
    content: string;
    type: 'text' | 'trip_suggestion' | 'booking_info' | 'error';
    data?: any;
    suggestions?: string[];
    memoriesUsed?: number;
}
export declare class AzureAIService {
    private endpoint;
    private token;
    private modelName;
    private cache;
    private readonly CACHE_TTL;
    private readonly baseSystemPromptVi;
    private readonly baseSystemPromptEn;
    constructor(endpoint: string, token: string, modelName: string);
    private getCacheKey;
    private getCachedResponse;
    private setCachedResponse;
    /**
     * Build system prompt with memory context if available
     */
    private buildSystemPrompt;
    /**
     * Generate chat response with optional memory integration
     * @param messages - Chat messages
     * @param language - Language code
     * @param systemPrompt - Optional custom system prompt
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    generateChatResponse(messages: ChatMessage[], language?: string, systemPrompt?: string, userId?: string, sessionId?: string): Promise<ChatCompletionResponse>;
    /**
     * Store chat conversation as memory (async helper)
     */
    private storeChatMemory;
    private classifyResponseType;
    private generateSuggestions;
    executeQuickAction(actionId: string, data?: any, language?: string, userId?: string, sessionId?: string): Promise<ChatCompletionResponse>;
}
//# sourceMappingURL=azure-ai.service.d.ts.map