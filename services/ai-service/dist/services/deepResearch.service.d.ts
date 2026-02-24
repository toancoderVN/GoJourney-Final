export interface SourceInfo {
    title: string;
    uri: string;
}
export interface DeepResearchStreamEvent {
    type: 'start' | 'thinking' | 'search_query' | 'content' | 'sources' | 'done' | 'error' | 'memory';
    content?: string;
    sources?: SourceInfo[];
    searchQueries?: string[];
    error?: string;
    memoriesUsed?: number;
}
export interface DeepResearchResult {
    content: string;
    thinkingContent: string;
    sources: SourceInfo[];
    searchQueries: string[];
    success: boolean;
    error?: string;
    memoriesUsed?: number;
}
export declare class DeepResearchService {
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
     * Stream Deep Research with memory injection
     * @param query - Research query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    searchWithStream(query: string, userId?: string, sessionId?: string): AsyncGenerator<DeepResearchStreamEvent>;
    /**
     * Non-streaming Deep Research with memory injection
     * @param query - Research query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    search(query: string, userId?: string, sessionId?: string): Promise<DeepResearchResult>;
    /**
     * Store research result as memory (async helper)
     */
    private storeResearchMemory;
}
//# sourceMappingURL=deepResearch.service.d.ts.map