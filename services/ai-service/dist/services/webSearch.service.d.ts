export interface SourceInfo {
    title: string;
    uri: string;
}
export interface WebSearchResult {
    content: string;
    sources: SourceInfo[];
    searchQueries: string[];
    success: boolean;
    error?: string;
    memoriesUsed?: number;
}
export interface WebSearchStreamEvent {
    type: 'content' | 'sources' | 'done' | 'error' | 'memory';
    content?: string;
    sources?: SourceInfo[];
    searchQueries?: string[];
    error?: string;
    memoriesUsed?: number;
}
export declare class WebSearchService {
    private ai;
    private readonly model;
    private readonly baseSystemPrompt;
    constructor();
    /**
     * Build system prompt with memory context if available
     */
    private buildSystemPrompt;
    /**
     * Extract sources from grounding metadata
     */
    private extractSources;
    /**
     * Stream search with memory injection
     * @param query - Search query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    searchWithStream(query: string, userId?: string, sessionId?: string): AsyncGenerator<WebSearchStreamEvent>;
    /**
     * Non-streaming search with memory injection
     * @param query - Search query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    search(query: string, userId?: string, sessionId?: string): Promise<WebSearchResult>;
    /**
     * Store search result as memory (async helper)
     */
    private storeSearchMemory;
}
//# sourceMappingURL=webSearch.service.d.ts.map