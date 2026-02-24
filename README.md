# 🌍 TravelAgent MVP - AI-Powered Travel Planning Platform

<p align="center">
  <img src="logo-removebg.png" alt="TravelAgent Logo" width="150" />
</p>

<p align="center">
  <strong>Nền tảng lập kế hoạch du lịch thông minh tích hợp AI Agent</strong>
</p>

<p align="center">
  <a href="#tính-năng">Tính năng</a> •
  <a href="#kiến-trúc">Kiến trúc</a> •
  <a href="#cài-đặt">Cài đặt</a> •
  <a href="#sử-dụng">Sử dụng</a> •
  <a href="#api-documentation">API Docs</a>
</p>

---

## 📋 Tổng quan

TravelAgent là nền tảng lập kế hoạch du lịch cá nhân hóa tích hợp AI, cho phép người dùng:
- 💬 **Chat với AI** để tìm kiếm thông tin, nghiên cứu điểm đến
- 🏨 **Đặt phòng khách sạn** thông qua giao diện form thông minh
- 🔍 **Web Search** tích hợp với Google Gemini AI
- 📚 **Deep Research** nghiên cứu chuyên sâu về điểm đến
- 🧠 **Memory System** ghi nhớ sở thích người dùng qua các phiên

---

## ✨ Tính năng

### 🤖 AI-Powered Chat
- **General Chat**: Trò chuyện với AI về mọi chủ đề du lịch
- **Web Search**: Tìm kiếm thông tin real-time với Gemini AI + Google Search
- **Deep Research**: Nghiên cứu chuyên sâu với phân tích nhiều nguồn

### 🏨 Booking Agent
- Form đặt phòng thông minh với validation
- Hỗ trợ nhiều loại hình lưu trú (hotel, resort, homestay, villa)
- Tùy chọn tiện nghi bắt buộc/ưu tiên
- Chế độ booking Normal/Urgent

### 🧠 Memory System (RAG)
- Lưu trữ sở thích người dùng vào ChromaDB
- Tự động recall context từ các phiên trước
- Cá nhân hóa phản hồi AI

### 👥 User Management
- Đăng ký/đăng nhập với JWT Authentication
- Quản lý profile và travel preferences
- Travel companions management

---

## 🏗️ Kiến trúc

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite + Ant Design 5 |
| **Backend** | Node.js + NestJS + TypeScript |
| **AI Services** | Google Gemini API + GitHub Models (GPT-4o) |
| **Database** | PostgreSQL 15 + Redis 7 |
| **Vector DB** | ChromaDB (for RAG Memory) |
| **Authentication** | JWT + OAuth2 (Google/Facebook) |
| **Search** | Elasticsearch 8 |

### Monorepo Structure

```
travel-agent-mvp/
├── 📁 apps/
│   └── web/                    # React Frontend (Vite)
│
├── 📁 services/
│   ├── ai-service/             # AI Chat, Web Search, Deep Research (Port 3005)
│   ├── auth-service/           # Authentication & JWT (Port 3001)
│   ├── user-service/           # User Profiles & Preferences (Port 3002)
│   └── trip-service/           # Trip Management (Port 3003)
│
├── 📁 libs/
│   ├── common-types/           # Shared TypeScript types
│   └── sdk/                    # Internal SDK
│
├── 📁 docs/                    # Documentation
├── 📁 tests/                   # E2E & Integration tests
└── 📁 infra/                   # Docker, Scripts
```

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│                     http://localhost:3000                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service │    │   AI Service    │    │  User Service   │
│   Port 3001   │    │   Port 3005     │    │   Port 3002     │
│               │    │                 │    │                 │
│ • Login/Register   │ • Chat          │    │ • Profiles      │
│ • JWT Tokens  │    │ • Web Search    │    │ • Preferences   │
│ • OAuth2      │    │ • Deep Research │    │ • Companions    │
└───────┬───────┘    │ • Booking Agent │    └────────┬────────┘
        │            │ • Memory (RAG)  │             │
        │            └────────┬────────┘             │
        │                     │                      │
        ▼                     ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                        PostgreSQL + Redis                       │
│                       (Docker Compose)                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │    ChromaDB     │
                    │   Port 8000     │
                    │  (Vector Store) │
                    └─────────────────┘
```

---

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Docker** & Docker Compose
- **Git**

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd travel-agent-mvp
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình environment

```bash
# Copy file environment mẫu
cp .env.example .env

# Chỉnh sửa các biến môi trường cần thiết
# Đặc biệt các API keys:
# - GEMINI_API_KEY (cho Web Search & Deep Research)
# - GITHUB_TOKEN (cho General Chat với GPT-4o)
```

### Bước 4: Khởi động Docker services

```bash
# Khởi động PostgreSQL, Redis, Elasticsearch
docker-compose up -d

# Kiểm tra containers đang chạy
docker-compose ps
```

### Bước 5: Khởi động ChromaDB (cho Memory System)

```bash
# Terminal riêng - chạy ChromaDB
cd services/ai-service
chroma run --path ./chroma_data --host localhost --port 8000
```

### Bước 6: Chạy ứng dụng

```bash
# Chạy tất cả services cùng lúc (từ root)
npm run dev

# HOẶC chạy từng service riêng:
npm run dev:web        # Frontend - http://localhost:3000
npm run dev:auth       # Auth Service - http://localhost:3001
npm run dev:user       # User Service - http://localhost:3002
npm run dev:ai         # AI Service - http://localhost:3005
```

---

## 🎯 Sử dụng

### Truy cập ứng dụng

| Service | URL | Mô tả |
|---------|-----|-------|
| **Web App** | http://localhost:3000 | Giao diện người dùng |
| **Auth API** | http://localhost:3001/api/docs | Swagger API Docs |
| **User API** | http://localhost:3002/api/docs | Swagger API Docs |
| **AI API** | http://localhost:3005 | AI Service endpoints |
| **ChromaDB** | http://localhost:8000 | Vector Database |

### Các tính năng chính

#### 1. Đăng ký / Đăng nhập
- Truy cập http://localhost:3000/login
- Đăng ký tài khoản mới hoặc đăng nhập

#### 2. Chat với AI
- Vào trang Chat
- Gõ tin nhắn để trò chuyện với AI
- Sử dụng **Web Search** để tìm kiếm thông tin
- Sử dụng **Deep Research** để nghiên cứu chuyên sâu

#### 3. Đặt phòng khách sạn
- Từ Chat, bấm vào icon đặt phòng
- Điền form thông tin booking
- Submit để AI hỗ trợ tìm kiếm

---

## 📚 API Documentation

### AI Service Endpoints

```
POST /ai/chat/message          # General chat
POST /ai/web-search            # Web search with Gemini
POST /ai/web-search/stream     # Web search streaming
POST /ai/deep-research         # Deep research
POST /ai/deep-research/stream  # Deep research streaming
POST /ai/booking-rag/context   # Set booking context
POST /ai/booking-rag/query     # Query booking agent
```

### Auth Service Endpoints

```
POST /auth/register            # Đăng ký
POST /auth/login               # Đăng nhập
POST /auth/refresh             # Refresh token
POST /auth/logout              # Đăng xuất
GET  /auth/me                  # Thông tin user hiện tại
```

### User Service Endpoints

```
GET    /users/profile/:id      # Get user profile
PUT    /users/profile/:id      # Update profile
GET    /travel-companions      # Get travel companions
POST   /travel-companions      # Add companion
DELETE /travel-companions/:id  # Remove companion
```

---

## 🔧 Development Commands

```bash
# Development
npm run dev                    # Chạy tất cả services
npm run dev:web               # Chỉ chạy frontend
npm run dev:services          # Chỉ chạy backend services

# Build
npm run build                 # Build toàn bộ
npm run build:libs            # Build shared libraries
npm run build:services        # Build backend services
npm run build:web             # Build frontend

# Database
npm run db:migrate            # Chạy migrations
npm run db:seed               # Seed data

# Docker
npm run docker:up             # Start Docker services
npm run docker:down           # Stop Docker services

# Testing & Linting
npm run test                  # Chạy tests
npm run lint                  # Chạy ESLint
```

---

## 🔐 Environment Variables

### Biến môi trường quan trọng

| Variable | Mô tả | Bắt buộc |
|----------|-------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `GITHUB_TOKEN` | GitHub Models API token | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `CHROMA_URL` | ChromaDB URL | ✅ |
| `REDIS_URL` | Redis connection string | ⚠️ |

### Lấy API Keys

1. **Gemini API Key**: https://aistudio.google.com/app/apikey
2. **GitHub Token**: https://github.com/settings/tokens (cần scope `models:read`)

---

## 📁 Cấu trúc thư mục chi tiết

```
services/ai-service/
├── src/
│   ├── controllers/           # API Controllers
│   │   ├── chat.controller.ts
│   │   ├── webSearch.controller.ts
│   │   ├── deepResearch.controller.ts
│   │   └── booking-rag.controller.ts
│   │
│   ├── services/              # Business Logic
│   │   ├── azure-ai.service.ts      # Chat with GitHub Models
│   │   ├── webSearch.service.ts     # Web Search with Gemini
│   │   ├── deepResearch.service.ts  # Deep Research
│   │   └── booking.orchestrator.ts  # Booking FSM
│   │
│   ├── rag/                   # RAG Memory System
│   │   ├── memory.service.ts        # Memory CRUD
│   │   ├── memory.types.ts          # Type definitions
│   │   ├── vectorDb.ts              # ChromaDB client
│   │   └── sessionStore.ts          # Session management
│   │
│   └── prompts/               # AI Prompts
│       ├── traveler-agent.prompt.ts
│       └── system-prompts.ts
```

---

## 🧪 Testing

```bash
# Chạy tất cả tests
npm run test

# Test AI service
cd services/ai-service
npm run test

# Test script cho Memory System
npx ts-node test-memory.ts
```

---

## 🐛 Troubleshooting

### Lỗi thường gặp

#### 1. ChromaDB không kết nối được
```bash
# Đảm bảo ChromaDB đang chạy
cd services/ai-service
npx chroma run --path ./chroma_data
```

#### 2. Database column không tồn tại
```bash
# Rebuild user-service để sync schema
cd services/user-service
rm -rf dist && npm run build
# Restart service
```

#### 3. Port đã được sử dụng
```bash
# Kiểm tra và kill process
lsof -i :3005
kill -9 <PID>
```

---

## 📈 Roadmap

### ✅ Đã hoàn thành
- [x] Core AI Chat với GPT-4o
- [x] Web Search với Google Gemini
- [x] Deep Research functionality
- [x] Memory System (RAG) với ChromaDB
- [x] User authentication (JWT)
- [x] Booking form interface
- [x] Vietnamese language support

---

## 👥 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

Private - Internal use only

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra [Troubleshooting](#-troubleshooting)
2. Xem documentation trong `/docs`
3. Tạo issue trên repository

---

<p align="center">
  Made with ❤️ by TravelAgent Team
</p>
