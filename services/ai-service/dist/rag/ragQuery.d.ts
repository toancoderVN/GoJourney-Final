/**
 * @deprecated This file is deprecated and no longer used.
 * Booking agent now operates independently without RAG/ChromaDB.
 * Memory system is handled by memory.service.ts for Web Search, Deep Research, and General Chat.
 */
import { AzureAIService } from "../services/azure-ai.service";
import { AgentAction, BookingState } from "../types/agent.types";
export interface RetrievedContext {
    text: string;
    metadata: {
        userId: string;
        sessionId: string;
        chunkType: string;
        timestamp: string;
    };
    similarity: number;
}
/**
 * Query RAG (Chroma) for relevant context based on user message
 * Returns top-K most relevant chunks
 * @deprecated No longer used - booking agent operates without RAG
 */
export declare function retrieveRelevantContext(userId: string, currentSessionId: string, query: string, topK?: number): Promise<RetrievedContext[]>;
/**
 * Format retrieved RAG contexts for injection into prompt
 * @deprecated No longer used
 */
export declare function formatRAGContextForPrompt(contexts: RetrievedContext[]): string;
/**
 * Query agent with RAG pipeline
 * @deprecated No longer used - booking agent operates without RAG
 */
export declare function queryAgentWithRAG(sessionId: string, userId: string, userMessage: string, azureAIService: AzureAIService): Promise<{
    action: AgentAction;
    sessionState: BookingState;
    retrievedContext: string[];
}>;
//# sourceMappingURL=ragQuery.d.ts.map