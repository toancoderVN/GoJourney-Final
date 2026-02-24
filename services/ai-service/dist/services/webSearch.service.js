import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { memoryService } from '../rag/memory.service';
dotenv.config();
export class WebSearchService {
    ai;
    model = 'gemini-2.5-flash-lite';
    baseSystemPrompt = `Bạn là GoJourney - trợ lý du lịch thông minh.

NHIỆM VỤ:
- Tìm kiếm và cung cấp thông tin về khách sạn, địa điểm du lịch, nhà hàng tại Việt Nam
- Luôn cố gắng tìm SỐ ĐIỆN THOẠI liên hệ của các cơ sở kinh doanh
- Trả lời bằng tiếng Việt, định dạng Markdown dễ đọc

ĐỊNH DẠNG TRẢ LỜI:
- Dùng heading (## ###) để phân chia nội dung
- Dùng bullet points (-) cho danh sách
- In đậm (**text**) cho thông tin quan trọng như tên, giá, số điện thoại
- Cung cấp thông tin thực tế, chính xác từ kết quả tìm kiếm`;
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY không tồn tại trong .env');
        }
        this.ai = new GoogleGenAI({ apiKey });
    }
    /**
     * Build system prompt with memory context if available
     */
    buildSystemPrompt(memoryContext) {
        if (!memoryContext.hasMemories) {
            return this.baseSystemPrompt;
        }
        return `${this.baseSystemPrompt}

${memoryContext.formattedText}`;
    }
    /**
     * Extract sources from grounding metadata
     */
    extractSources(metadata) {
        if (!metadata?.groundingChunks)
            return [];
        return metadata.groundingChunks
            .filter((chunk) => chunk.web)
            .map((chunk) => ({
            title: chunk.web?.title || 'Unknown',
            uri: chunk.web?.uri || '',
        }))
            .filter((source) => source.uri); // Chỉ giữ những source có URL
    }
    /**
     * Stream search with memory injection
     * @param query - Search query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    async *searchWithStream(query, userId, sessionId) {
        try {
            console.log('🔍 [WebSearch] Starting stream search:', query);
            if (userId) {
                console.log('👤 [WebSearch] User ID:', userId);
            }
            // Step 1: Retrieve relevant memories if userId is provided
            let memoryContext = {
                hasMemories: false,
                formattedText: '',
                memoriesUsed: 0,
            };
            if (userId) {
                try {
                    const memories = await memoryService.retrieveRelevantMemories({
                        userId,
                        query,
                        topK: 3,
                        minSimilarity: 0.3,
                    });
                    if (memories.length > 0) {
                        memoryContext = memoryService.formatMemoriesForPrompt(memories);
                        console.log(`📚 [WebSearch] Injecting ${memoryContext.memoriesUsed} memories`);
                        // Emit memory event to inform frontend
                        yield {
                            type: 'memory',
                            memoriesUsed: memoryContext.memoriesUsed,
                        };
                    }
                }
                catch (memoryError) {
                    console.warn('⚠️ [WebSearch] Memory retrieval failed:', memoryError.message);
                    // Continue without memory - don't fail the search
                }
            }
            // Step 2: Build system prompt with memory context
            const systemPrompt = this.buildSystemPrompt(memoryContext);
            // Step 3: Execute search
            const responseStream = await this.ai.models.generateContentStream({
                model: this.model,
                contents: query,
                config: {
                    systemInstruction: systemPrompt,
                    tools: [{ googleSearch: {} }],
                    thinkingConfig: {
                        thinkingBudget: 0, // Tắt thinking để response nhanh hơn
                    },
                },
            });
            let fullContent = '';
            let sources = [];
            let searchQueries = [];
            let groundingSupports = [];
            let groundingChunks = [];
            for await (const chunk of responseStream) {
                // Stream từng chunk text
                if (chunk.text) {
                    fullContent += chunk.text;
                    yield {
                        type: 'content',
                        content: chunk.text,
                    };
                }
                // Lấy grounding metadata từ chunk cuối
                const candidate = chunk.candidates?.[0];
                if (candidate?.groundingMetadata) {
                    const metadata = candidate.groundingMetadata;
                    // Lấy search queries
                    if (metadata.webSearchQueries) {
                        searchQueries = metadata.webSearchQueries;
                    }
                    // Lưu grounding data để xử lý citations
                    if (metadata.groundingChunks) {
                        groundingChunks = metadata.groundingChunks;
                    }
                    if (metadata.groundingSupports) {
                        groundingSupports = metadata.groundingSupports;
                    }
                    // Lấy sources với title và URI
                    sources = this.extractSources(metadata);
                    // Debug log to see actual structure
                    console.log('🔍 [WebSearch] Grounding Metadata:', JSON.stringify({
                        chunksCount: groundingChunks.length,
                        supportsCount: groundingSupports.length,
                        sampleChunk: groundingChunks[0],
                        sampleSupport: groundingSupports[0]
                    }, null, 2));
                }
            }
            // Gửi sources sau khi stream xong
            if (sources.length > 0 || searchQueries.length > 0) {
                yield {
                    type: 'sources',
                    sources,
                    searchQueries,
                };
            }
            yield { type: 'done' };
            console.log('✅ [WebSearch] Stream completed. Sources:', sources.length);
            // Step 4: Store search result as memory (async, don't wait)
            if (userId && fullContent.length > 100) {
                this.storeSearchMemory(userId, sessionId, query, fullContent).catch(err => {
                    console.warn('⚠️ [WebSearch] Failed to store memory:', err.message);
                });
            }
        }
        catch (error) {
            console.error('❌ [WebSearch] Stream error:', error);
            yield {
                type: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    /**
     * Non-streaming search with memory injection
     * @param query - Search query
     * @param userId - Optional user ID for memory retrieval
     * @param sessionId - Optional session ID for memory storage
     */
    async search(query, userId, sessionId) {
        try {
            console.log('🔍 [WebSearch] Starting search:', query);
            // Step 1: Retrieve relevant memories if userId is provided
            let memoryContext = {
                hasMemories: false,
                formattedText: '',
                memoriesUsed: 0,
            };
            if (userId) {
                try {
                    const memories = await memoryService.retrieveRelevantMemories({
                        userId,
                        query,
                        topK: 3,
                        minSimilarity: 0.3,
                    });
                    if (memories.length > 0) {
                        memoryContext = memoryService.formatMemoriesForPrompt(memories);
                        console.log(`📚 [WebSearch] Injecting ${memoryContext.memoriesUsed} memories`);
                    }
                }
                catch (memoryError) {
                    console.warn('⚠️ [WebSearch] Memory retrieval failed:', memoryError.message);
                }
            }
            // Step 2: Build system prompt with memory context
            const systemPrompt = this.buildSystemPrompt(memoryContext);
            // Step 3: Execute search
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: query,
                config: {
                    systemInstruction: systemPrompt,
                    tools: [{ googleSearch: {} }],
                    thinkingConfig: {
                        thinkingBudget: 0,
                    },
                },
            });
            const content = response.text || '';
            let sources = [];
            let searchQueries = [];
            // Lấy grounding metadata
            const metadata = response.candidates?.[0]?.groundingMetadata;
            if (metadata) {
                if (metadata.webSearchQueries) {
                    searchQueries = metadata.webSearchQueries;
                }
                // Lấy sources với title và URI
                sources = this.extractSources(metadata);
            }
            console.log('✅ [WebSearch] Search completed. Content length:', content.length);
            console.log('📚 Sources found:', sources.map(s => s.title));
            // Step 4: Store search result as memory (async, don't wait)
            if (userId && content.length > 100) {
                this.storeSearchMemory(userId, sessionId, query, content).catch(err => {
                    console.warn('⚠️ [WebSearch] Failed to store memory:', err.message);
                });
            }
            return {
                content,
                sources,
                searchQueries,
                success: true,
                memoriesUsed: memoryContext.memoriesUsed,
            };
        }
        catch (error) {
            console.error('❌ [WebSearch] Search error:', error);
            return {
                content: '',
                sources: [],
                searchQueries: [],
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    /**
     * Store search result as memory (async helper)
     */
    async storeSearchMemory(userId, sessionId, query, content) {
        await memoryService.extractAndStoreFromConversation(userId, sessionId || 'unknown', query, content, 'web_search');
        console.log('💾 [WebSearch] Search stored as memory');
    }
}
//# sourceMappingURL=webSearch.service.js.map