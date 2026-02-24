# 📋 DANH SÁCH ĐẦY ĐỦ CÁC FILE CODE LIÊN QUAN ĐẾN AI

Đây là tài liệu tóm tắt tất cả các file/folder trong phần AI Service liên quan đến các chức năng chính.

---

## 📁 CẤU TRÚC THƯMỤC AI SERVICE

```
services/ai-service/
├── src/
│   ├── index.ts                          # Main entry point, khởi động Express server
│   │
│   ├── controllers/                      # API handlers
│   │   ├── chat.controller.ts            # ✅ General Chat, Intent Classification
│   │   ├── webSearch.controller.ts       # 🔍 Web Search endpoint
│   │   ├── deepResearch.controller.ts    # 📚 Deep Research endpoint
│   │   ├── zalo.controller.ts            # 💬 Zalo integration (send/receive messages)
│   │   ├── booking-rag.controller.ts     # 🏨 Booking Agent endpoint
│   │   └── booking-webhook.controller.ts # 🔔 Webhook from Zalo (hotel responses)
│   │
│   ├── services/                         # Business logic
│   │   ├── azure-ai.service.ts           # 🤖 Azure/GitHub Models API client (GPT-4o)
│   │   ├── webSearch.service.ts          # 🔍 Web Search logic (Gemini 2.5 flash-lite)
│   │   ├── deepResearch.service.ts       # 📚 Deep Research logic (Gemini 2.5 flash)
│   │   ├── booking.orchestrator.ts       # 🏨 Booking Agent orchestration
│   │   ├── zalo.service.ts               # 💬 Zalo API integration
│   │   ├── zalo-lookup.service.ts        # 🔍 Lookup Zalo OA IDs
│   │   ├── trip-integration.service.ts   # 🚀 Integration with Trip Service
│   │   └── booking-negotiation.engine.ts # (nếu có) Negotiation logic
│   │
│   ├── types/                            # TypeScript interfaces & enums
│   │   ├── agent.types.ts                # 🏨 Booking Agent types (BookingState, AgentIntent, etc.)
│   │   └── embeddings.d.ts               # Type definitions for embeddings
│   │
│   ├── prompts/                          # System prompts for LLMs
│   │   └── traveler-agent.prompt.ts      # 🏨 System prompt for Booking Agent (365 lines)
│   │
│   ├── rag/                              # Memory System (RAG - Retrieval Augmented Generation)
│   │   ├── memory.service.ts             # 🧠 Main memory service (retrieve + store)
│   │   ├── memory.types.ts               # 🧠 Memory data types
│   │   ├── vectorDb.ts                   # 🗄️ ChromaDB connection & query
│   │   ├── embeddings.ts                 # 🔢 Convert text to embeddings (Xenova)
│   │   ├── chunker.ts                    # ✂️ Split long text into chunks
│   │   ├── ingest.ts                     # 📥 Ingest text into vector DB
│   │   ├── ragQuery.ts                   # 🔍 Query RAG system
│   │   └── sessionStore.ts               # 💾 Store/retrieve session context
│   │
│   ├── utils/                            # Utility functions
│   │   ├── deepResearchLogger.ts         # 🔍 Logger for Deep Research process
│   │   └── sseParser.ts                  # 📡 Server-Sent Events parser
│   │
│   ├── global.d.ts                       # Global TypeScript declarations
│   └── package.json                      # Dependencies
│
├── chroma_data/                          # Local ChromaDB storage
│   ├── chroma.sqlite3                    # Vector database file
│   └── d99eef4b-.../                     # Chroma collections
│
├── zalo-credentials/                     # Zalo authentication files
│   └── (Zalo account credentials)
│
├── logs/                                 # Application logs
│   └── (Log files)
│
├── PROMPT_RULES.md                       # ⚠️ CRITICAL - Booking Agent rules
└── docker-compose.yml                    # (nếu có) Docker setup

```

---

## 🔴 **1. GENERAL CHAT (Chat thường, Trip Planning)**

### **Controllers**
- **File**: [chat.controller.ts](src/controllers/chat.controller.ts)
- **Endpoints**:
  - `POST /api/v1/chat/send` - Gửi message và nhận response
  - `POST /api/v1/chat/classify` - Classify intent của message
  - `GET /api/v1/chat/quick-actions` - Lấy gợi ý hành động
  - `POST /api/v1/chat/quick-actions/execute` - Thực hiện gợi ý

### **Services**
- **File**: [azure-ai.service.ts](src/services/azure-ai.service.ts) (147 lines)
- **Chức năng**:
  - Khởi tạo kết nối với GitHub Models API
  - Gọi `openai/gpt-4o-mini` model
  - Cache kết quả (5 phút TTL)
  - Tích hợp memory system (RAG)
  
### **Memory Integration**
- **Retrieve**: Lấy memories liên quan từ ChromaDB
- **Inject**: Thêm context vào system prompt
- **Store**: Lưu conversation vào ChromaDB (async)

### **Types**
- **File**: [agent.types.ts](src/types/agent.types.ts)
- **Định nghĩa**: `BookingState`, `AgentIntent`, `PaymentRequest`

---

## 🔍 **2. WEB SEARCH (Tìm kiếm web nhanh)**

### **Controllers**
- **File**: [webSearch.controller.ts](src/controllers/webSearch.controller.ts) (96 lines)
- **Endpoints**:
  - `POST /api/v1/web-search` - Non-streaming search
  - `POST /api/v1/web-search/stream` - Streaming search (SSE)

### **Services**
- **File**: [webSearch.service.ts](src/services/webSearch.service.ts) (344 lines)
- **Model**: `gemini-2.5-flash-lite` (Google)
- **Chức năng chính**:
  - `searchWithStream()` - Stream search results
  - `search()` - Non-streaming search
  - `extractSources()` - Parse grounding metadata
  - Memory injection & storage

### **Memory Integration**
- **Type**: Tùy chọn (nếu `userId` được cung cấp)
- **Retrieve**: 3 memories tương tự nhất
- **Store**: Lưu kết quả search vào ChromaDB

### **Features**
- ✅ Server-Sent Events (SSE) streaming
- ✅ Automatic source extraction (links)
- ✅ Memory injection
- ✅ Response caching (optional)

---

## 📚 **3. DEEP RESEARCH (Nghiên cứu sâu)**

### **Controllers**
- **File**: [deepResearch.controller.ts](src/controllers/deepResearch.controller.ts) (112 lines)
- **Endpoints**:
  - `POST /api/v1/deep-research` - Non-streaming research
  - `POST /api/v1/deep-research/stream` - Streaming research (SSE)

### **Services**
- **File**: [deepResearch.service.ts](src/services/deepResearch.service.ts) (403 lines)
- **Model**: `gemini-2.5-flash` (Google)
- **Chức năng chính**:
  - `searchWithStream()` - Multi-step research with streaming
  - `search()` - Non-streaming deep research
  - Thinking process (thinkingBudget: 512)
  - Multiple search queries

### **Memory Integration**
- **Type**: Bắt buộc (nếu `userId` được cung cấp)
- **Retrieve**: 3 memories tương tự nhất
- **Store**: Lưu research result vào ChromaDB (content > 100 chars)

### **Streaming Events**
- `start` - Bắt đầu research
- `thinking` - Quá trình suy nghĩ của AI
- `search_query` - Query mà AI đang tìm
- `content` - Nội dung được generate
- `sources` - Danh sách sources
- `done` - Kết thúc
- `error` - Lỗi

### **Features**
- ✅ Thinking mode ON (512 tokens)
- ✅ Multiple search iterations (5-10 searches)
- ✅ Streaming content in real-time
- ✅ Detailed grounding metadata
- ✅ Memory integration & storage

---

## 🏨 **4. BOOKING AGENT (Đặt phòng tự động)**

### **Controllers**
- **File**: [booking-rag.controller.ts](src/controllers/booking-rag.controller.ts)
  - `POST /api/v1/booking-rag/context` - Set booking context
  - `POST /api/v1/booking-rag/query` - Query booking agent

- **File**: [booking-webhook.controller.ts](src/controllers/booking-webhook.controller.ts)
  - `POST /api/v1/booking-webhook` - Webhook from Zalo (hotel responses)

### **Services**
- **File**: [booking.orchestrator.ts](src/services/booking.orchestrator.ts) (311 lines)
- **Main Class**: `BookingOrchestrator`
- **Model**: `openai/gpt-4o-mini` (GitHub Models API)
- **Chức năng**:
  - `handleBookingRequest()` - Process booking request
  - `handleHotelResponse()` - Handle hotel's reply
  - State management (BookingState enum)
  - Context persistence

### **System Prompt**
- **File**: [traveler-agent.prompt.ts](src/prompts/traveler-agent.prompt.ts) (365 lines)
- **Content**:
  - Role definition: AI as conversational proxy
  - Critical rules (Rule #1, #2, etc.)
  - Auto-run mode capabilities
  - Negotiation strategies
  - Payment confirmation logic

### **Types**
```typescript
// BookingState enum
INPUT_READY
CONTACTING_HOTEL
NEGOTIATING
WAITING_USER_CONFIRM_PAYMENT
CONFIRMED
CANCELLED

// AgentIntent union type
NEGOTIATE | REQUEST_PAYMENT | CONFIRM_PAYMENT | FINISH | CANCEL
```

### **Session Management**
- **In-memory store**: Map<sessionId, BookingState>
- **Context storage**: Map<sessionId, context>
- **SessionStore** (backup): localStorage alternative

### **Features**
- ✅ Multi-turn conversation
- ✅ State machine (BookingState)
- ✅ Auto-negotiation (price, amenities, cancellation policy)
- ✅ Payment request handling
- ✅ Intent classification (NEGOTIATE, REQUEST_PAYMENT, etc.)

---

## 💬 **5. ZALO INTEGRATION (Chat with Hotels)**

### **Controllers**
- **File**: [zalo.controller.ts](src/controllers/zalo.controller.ts)
- **Endpoints**:
  - `POST /api/v1/zalo/login-qr` - Generate QR for Zalo login
  - `GET /api/v1/zalo/login-status/:accountId` - Check login status
  - `GET /api/v1/zalo/account-info/:accountId` - Get account info
  - `GET /api/v1/zalo/auto-restore/:accountId` - Restore session
  - `GET /api/v1/zalo/conversations/:accountId` - Get conversation list
  - `DELETE /api/v1/zalo/account/:accountId` - Disconnect account
  - `POST /api/v1/zalo/send-message` - Send message to hotel

### **Services**
- **File**: [zalo.service.ts](src/services/zalo.service.ts)
- **Chức năng**:
  - Connect Zalo account
  - Send messages to hotels
  - Receive messages (webhook)
  - Store conversation history

- **File**: [zalo-lookup.service.ts](src/services/zalo-lookup.service.ts)
- **Chức năng**:
  - Lookup Zalo OA IDs from database
  - Find hotel contact information

### **Features**
- ✅ QR code login
- ✅ Message sending/receiving
- ✅ Webhook handling
- ✅ Conversation persistence
- ✅ Account management

---

## 🧠 **6. MEMORY SYSTEM (RAG - Retrieval Augmented Generation)**

### **Core Files**

#### **memory.service.ts** (Main Memory Engine)
```typescript
class MemoryService {
  // Main methods:
  retrieveRelevantMemories(query, userId, topK, minSimilarity)
  storeMemory(userId, sessionId, content, type)
  formatMemoriesForPrompt(memories)
}
```
- **Chức năng**: Retrieve + format memories cho AI
- **Sử dụng trong**: Chat, Web Search, Deep Research, Booking Agent

#### **memory.types.ts** (Data Structures)
```typescript
interface Memory {
  id: string
  userId: string
  content: string
  embedding: number[]
  createdAt: Date
  type: 'chat' | 'search' | 'research' | 'booking'
}

interface FormattedMemoryContext {
  hasMemories: boolean
  formattedText: string
  memoriesUsed: number
}
```

#### **vectorDb.ts** (ChromaDB Client)
- Connect to ChromaDB (localhost:8000)
- Query vectors
- Store embeddings
- Manage collections

#### **embeddings.ts** (Convert Text → Vectors)
- Use Xenova models (local embedding)
- Convert user preferences to vectors
- Used by RAG system

#### **chunker.ts** (Split Text into Chunks)
- Break long text into manageable pieces
- Prepare for embedding
- Handle overlapping chunks

#### **ingest.ts** (Add Data to Vector DB)
- Add memories to ChromaDB
- Create embeddings on-the-fly
- Store metadata

#### **ragQuery.ts** (Query Vector DB)
- Semantic search on ChromaDB
- Find similar memories
- Retrieve top-K results

#### **sessionStore.ts** (Session Context Storage)
```typescript
interface Session {
  sessionId: string
  userId: string
  context: {
    bookingRequest?: any
    hotelResponse?: any
    conversationHistory?: any
  }
  createdAt: Date
  updatedAt: Date
}
```
- Store session-specific context
- Retrieve on demand
- Used by Booking Agent

---

## 🔌 **7. UTILITIES**

#### **deepResearchLogger.ts**
- Log Deep Research process steps
- Track search queries
- Monitor performance

#### **sseParser.ts**
- Parse Server-Sent Events
- Format streaming response
- Client-side support

---

## 📞 **8. INTEGRATION WITH OTHER SERVICES**

### **Trip Integration**
- **File**: [trip-integration.service.ts](src/services/trip-integration.service.ts)
- **Chức năng**:
  - Create Trip record after booking confirmed
  - Store booking details
  - Link with Trip Service API (localhost:3003)

### **APIs Called**
```
POST http://localhost:3003/api/trips         # Create new trip
POST http://localhost:3003/api/bookings      # Create booking record
```

---

## 📋 **API ENDPOINTS SUMMARY**

### **Chat Endpoints**
```
POST   /api/v1/chat/send                    # Send message → GPT-4o
POST   /api/v1/chat/classify                # Classify intent
GET    /api/v1/chat/quick-actions           # Get suggestions
POST   /api/v1/chat/quick-actions/execute   # Execute action
```

### **Search Endpoints**
```
POST   /api/v1/web-search                   # Web search → Gemini lite
POST   /api/v1/web-search/stream            # Stream web search
```

### **Research Endpoints**
```
POST   /api/v1/deep-research                # Deep research → Gemini
POST   /api/v1/deep-research/stream         # Stream research
```

### **Booking Endpoints**
```
POST   /api/v1/booking-rag/context          # Set booking context
POST   /api/v1/booking-rag/query            # Query booking agent
POST   /api/v1/booking-webhook              # Webhook from hotel (Zalo)
```

### **Zalo Endpoints**
```
POST   /api/v1/zalo/login-qr                # Generate QR
GET    /api/v1/zalo/login-status/:id        # Check status
GET    /api/v1/zalo/account-info/:id        # Get info
POST   /api/v1/zalo/send-message            # Send message
GET    /api/v1/zalo/conversations/:id       # Get messages
DELETE /api/v1/zalo/account/:id             # Disconnect
```

---

## 📦 **DEPENDENCIES**

### **AI/ML**
```json
{
  "@google/genai": "^1.35.0",              // Google Gemini API
  "@xenova/transformers": "^2.17.1",       // Local embeddings
  "openai": "^6.10.0",                     // OpenAI SDK (optional)
  "axios": "^1.5.0"                        // HTTP client
}
```

### **Zalo**
```json
{
  "zalo-api-final": "^2.1.1"               // Zalo API client
}
```

### **Web Server**
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "morgan": "^1.10.0"
}
```

---

## ⚡ **QUICK REFERENCE**

| Chức năng | Controller | Service | Model | Endpoints |
|-----------|-----------|---------|-------|-----------|
| **Chat** | chat.controller.ts | azure-ai.service.ts | gpt-4o-mini | `/chat/send`, `/chat/classify` |
| **Web Search** | webSearch.controller.ts | webSearch.service.ts | gemini-2.5-flash-lite | `/web-search`, `/web-search/stream` |
| **Deep Research** | deepResearch.controller.ts | deepResearch.service.ts | gemini-2.5-flash | `/deep-research`, `/deep-research/stream` |
| **Booking** | booking-rag.controller.ts | booking.orchestrator.ts | gpt-4o-mini | `/booking-rag/query` |
| **Zalo** | zalo.controller.ts | zalo.service.ts | Zalo API | `/zalo/*` |
| **Memory** | N/A | memory.service.ts | Xenova | ChromaDB (8000) |

---

## 🔑 **CRITICAL FILES TO UNDERSTAND FIRST**

### **Priority 1 (Must Read)**
1. ✅ [index.ts](src/index.ts) - Entry point, all endpoints
2. ✅ [chat.controller.ts](src/controllers/chat.controller.ts) - Main chat flow
3. ✅ [azure-ai.service.ts](src/services/azure-ai.service.ts) - GPT-4o integration
4. ✅ [booking.orchestrator.ts](src/services/booking.orchestrator.ts) - Booking logic
5. ✅ [traveler-agent.prompt.ts](src/prompts/traveler-agent.prompt.ts) - Booking rules

### **Priority 2 (Should Know)**
6. 📚 [deepResearch.service.ts](src/services/deepResearch.service.ts) - Research logic
7. 🔍 [webSearch.service.ts](src/services/webSearch.service.ts) - Search logic
8. 💬 [zalo.service.ts](src/services/zalo.service.ts) - Zalo integration
9. 🧠 [memory.service.ts](src/rag/memory.service.ts) - Memory system
10. 📋 [agent.types.ts](src/types/agent.types.ts) - Type definitions

### **Priority 3 (Nice to Have)**
11. 🏗️ [trip-integration.service.ts](src/services/trip-integration.service.ts) - Integration
12. 🔢 [embeddings.ts](src/rag/embeddings.ts) - Embedding logic
13. 💾 [sessionStore.ts](src/rag/sessionStore.ts) - Session storage

---

## 📊 **FILE STATISTICS**

| File | Lines | Purpose |
|------|-------|---------|
| traveler-agent.prompt.ts | 365 | Booking Agent system prompt |
| deepResearch.service.ts | 403 | Deep Research implementation |
| webSearch.service.ts | 344 | Web Search implementation |
| booking.orchestrator.ts | 311 | Booking orchestration |
| azure-ai.service.ts | 344 | GPT-4o API client |
| zalo.service.ts | ~300 | Zalo integration |

**Total AI Service**: ~2000+ lines of TypeScript code

---

**Đây là danh sách đầy đủ tất cả các file liên quan đến phần AI! Bạn có thể bắt đầu từ Priority 1 để hiểu rõ hơn về dự án.** 🚀
