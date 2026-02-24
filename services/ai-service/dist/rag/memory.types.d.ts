/**
 * Memory Types for RAG + Memory System
 * Purpose: TypeScript definitions for user memory storage and retrieval
 */
/**
 * Type of memory being stored
 */
export type MemoryType = 'preference' | 'search_history' | 'research' | 'conversation';
/**
 * Source of the memory
 */
export type MemorySource = 'web_search' | 'deep_research' | 'chat';
/**
 * Main memory document structure
 */
export interface UserMemory {
    id: string;
    userId: string;
    type: MemoryType;
    content: string;
    metadata: MemoryMetadata;
    createdAt: string;
}
/**
 * Metadata attached to each memory
 */
export interface MemoryMetadata {
    source: MemorySource;
    query?: string;
    sessionId?: string;
    keywords?: string[];
    importance?: 'low' | 'medium' | 'high';
}
/**
 * Result of memory retrieval
 */
export interface MemoryRetrievalResult {
    memory: UserMemory;
    similarity: number;
}
/**
 * Options for storing memory
 */
export interface StoreMemoryOptions {
    userId: string;
    type: MemoryType;
    content: string;
    source: MemorySource;
    query?: string;
    sessionId?: string;
    keywords?: string[];
    importance?: 'low' | 'medium' | 'high';
}
/**
 * Options for retrieving memory
 */
export interface RetrieveMemoryOptions {
    userId: string;
    query: string;
    topK?: number;
    types?: MemoryType[];
    sources?: MemorySource[];
    minSimilarity?: number;
}
/**
 * Formatted memory context for prompt injection
 */
export interface FormattedMemoryContext {
    hasMemories: boolean;
    formattedText: string;
    memoriesUsed: number;
}
//# sourceMappingURL=memory.types.d.ts.map