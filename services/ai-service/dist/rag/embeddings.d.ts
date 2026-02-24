/**
 * Embeddings module using local transformer model
 * Uses @xenova/transformers directly for better Windows compatibility
 */
/**
 * Create embedding vector from text using local OSS model
 * Model: Xenova/all-MiniLM-L6-v2 (384 dimensions)
 * Runs locally, no API key required
 */
export declare function createEmbedding(text: string): Promise<number[]>;
/**
 * Check if embeddings are available
 */
export declare function checkEmbeddingsHealth(): Promise<boolean>;
//# sourceMappingURL=embeddings.d.ts.map