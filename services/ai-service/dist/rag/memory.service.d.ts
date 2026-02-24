/**
 * Memory Service for RAG + Memory System
 * Purpose: CRUD operations for user memories in ChromaDB
 */
import { UserMemory, MemorySource, MemoryRetrievalResult, StoreMemoryOptions, RetrieveMemoryOptions, FormattedMemoryContext } from './memory.types';
/**
 * Memory Service - singleton for managing user memories
 */
declare class MemoryService {
    private initialized;
    /**
     * Ensure memory collection is initialized
     */
    private ensureInitialized;
    /**
     * Store a new memory
     */
    storeMemory(options: StoreMemoryOptions): Promise<UserMemory>;
    /**
     * Retrieve relevant memories for a user based on query
     */
    retrieveRelevantMemories(options: RetrieveMemoryOptions): Promise<MemoryRetrievalResult[]>;
    /**
     * Format memories into a prompt-injectable context string
     */
    formatMemoriesForPrompt(memories: MemoryRetrievalResult[]): FormattedMemoryContext;
    /**
     * Extract key information from a conversation and store as memory
     * This is a simplified extraction - can be enhanced with LLM summarization
     */
    extractAndStoreFromConversation(userId: string, sessionId: string, query: string, response: string, source: MemorySource): Promise<UserMemory | null>;
    /**
     * Store user preference
     */
    storePreference(userId: string, preference: string, source: MemorySource, sessionId?: string): Promise<UserMemory>;
    private getTypeEmoji;
    private getSourceLabel;
    private extractKeywords;
}
export declare const memoryService: MemoryService;
export {};
//# sourceMappingURL=memory.service.d.ts.map