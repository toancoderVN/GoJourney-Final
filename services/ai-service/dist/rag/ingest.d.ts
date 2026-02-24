/**
 * @deprecated This file is deprecated and no longer used.
 * Booking agent now operates independently without RAG/ChromaDB.
 * Memory system is handled by memory.service.ts for Web Search, Deep Research, and General Chat.
 */
import { BookingContext } from "./chunker";
/**
 * Ingest user booking context into Chroma Vector DB
 * @deprecated No longer used - booking agent operates without RAG
 */
export declare function ingestUserContext(userId: string, sessionId: string, contextJson: BookingContext): Promise<number>;
//# sourceMappingURL=ingest.d.ts.map