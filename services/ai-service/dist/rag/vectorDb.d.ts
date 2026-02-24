export interface SearchResult {
    text: string;
    metadata: Record<string, any>;
    distance: number;
}
/**
 * Initialize default Chroma collection (backward compatible)
 */
export declare function initializeCollection(): Promise<void>;
/**
 * Initialize memory collection
 */
export declare function initializeMemoryCollection(): Promise<void>;
/**
 * Add document with embedding to Chroma
 * @param id - Document ID
 * @param text - Text content to embed
 * @param metadata - Metadata to store with document
 * @param collectionName - Optional collection name (defaults to booking_context)
 */
export declare function addDocumentToChroma(id: string, text: string, metadata: Record<string, any>, collectionName?: string): Promise<void>;
/**
 * Semantic search in Chroma
 * @param query - Search query
 * @param topK - Number of results to return
 * @param filter - Optional metadata filter
 * @param collectionName - Optional collection name (defaults to booking_context)
 */
export declare function searchChroma(query: string, topK?: number, filter?: Record<string, any>, collectionName?: string): Promise<SearchResult[]>;
/**
 * Delete a collection (for testing/cleanup)
 * @param collectionName - Optional collection name (defaults to booking_context)
 */
export declare function deleteCollection(collectionName?: string): Promise<void>;
/**
 * Get collection info
 * @param collectionName - Optional collection name (defaults to booking_context)
 */
export declare function getCollectionInfo(collectionName?: string): Promise<any>;
export declare const COLLECTIONS: {
    readonly BOOKING: string;
    readonly MEMORY: "user_memory";
};
//# sourceMappingURL=vectorDb.d.ts.map