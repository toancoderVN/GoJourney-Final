# Báo cáo Dự án: Travel Agent MVP (AI-Powered)

Phiên bản: 1.0.0
Ngày: 2026-02-24
Người thực hiện: (Tên sinh viên / tác giả báo cáo)

## Mục lục

- Tổng quan dự án
- Mục tiêu và phạm vi
- Kiến trúc tổng thể
- Thành phần dịch vụ và mô tả chi tiết
- Công nghệ và phụ thuộc
- Dữ liệu và schema
- Thành phần AI, mô hình và luồng xử lý
- Giao diện người dùng (Front-end)
- Hệ thống vận hành, triển khai và hạ tầng
- Bảo mật và quản lý môi trường
- Kiểm thử, QA và CI/CD
- Hướng dẫn chạy thử cục bộ
- Kết luận và hướng phát triển
- Phụ lục: file tham chiếu

---

**Tổng quan dự án**

Travel Agent MVP là một nền tảng trợ lý du lịch sử dụng AI để hỗ trợ người dùng lên kế hoạch chuyến đi, tạo lịch trình, đàm phán đặt chỗ (thông qua Zalo API), và tương tác thông minh qua chat. Dự án được triển khai dưới dạng monorepo chứa:

- Ứng dụng web (React + Vite) cho UI.
- Nhiều microservices (Auth, User, Trip, AI) viết bằng TypeScript/Node.js.
- Thư viện chung trong `libs` để chia sẻ types và utilities.
- Cơ sở dữ liệu quan hệ (PostgreSQL) và thành phần vector store/chroma cho embeddings.

**Mục tiêu và phạm vi**

- Tạo MVP cho nền tảng quản trị chuyến đi cá nhân với khả năng sinh/gợi ý lịch trình bằng AI.
- Hỗ trợ tương tác tự động với nhà cung cấp (ví dụ khách sạn) qua Zalo API để đặt dịch vụ.
- Cung cấp UI trực quan, tích hợp bản đồ và lịch trình.
- Dự phòng các tính năng bảo mật, quản lý người dùng, và lưu trữ lịch sử chat.

**Kiến trúc tổng thể**

- Monorepo Node.js (workspaces): root `package.json` cấu hình workspaces cho `apps/*`, `services/*`, `libs/*`.
- Frontend: SPA React (Vite) giao tiếp qua REST/HTTP và WebSocket (socket.io-client).
- Backend: Các service HTTP (Express/TypeScript) tách trách nhiệm:
  - `auth-service`: Xác thực, quản lý token
  - `user-service`: Quản lý profile, preference
  - `trip-service`: Quản lý chuyến đi, booking, itinerary
  - `ai-service`: Xử lý prompt, embeddings, truy vấn mô hình, tích hợp Zalo
- Lưu trữ:
  - PostgreSQL cho dữ liệu quan hệ (schema chi tiết trong `docs/FULL_DATABASE_SCHEMA.md`).
  - Chroma (local sqlite trong `chroma_data`) hoặc vector DB để lưu embeddings cho truy vấn ngữ nghĩa.
- Truyền thông nội bộ: REST API giữa các service; có thể dùng message broker (không thấy trong repo hiện tại) nếu mở rộng.
- Triển khai: Docker + docker-compose, k8s manifests under `infra/k8s`, Terraform skeleton.

**Thành phần dịch vụ và mô tả chi tiết**

- `apps/web` (React + Vite): UI chính, sử dụng `antd`, `@ant-design/pro-components`, `mapbox-gl` cho bản đồ, `react-query`/`@tanstack/react-query` cho data fetching, `react-router-dom` cho routing.

- `services/ai-service`:
  - Framework: Express + TypeScript.
  - Thư viện AI: `openai`, `@google/genai`, `@xenova/transformers`, `@themaximalist/embeddings.js` (để tạo/đọc embeddings), local model inference option.
  - Tích hợp Zalo: `zalo-api-final` package.
  - Mục tiêu: xử lý prompt, quản lý context chat, tìm kiếm vector (Chroma), tạo content, đàm phán với nhà cung cấp.

- `services/trip-service`:
  - Quản lý thực thể `trips`, `bookings`, `itineraries`.
  - Migration/seed script (scripts nằm trong `services/trip-service`), tương tác DB.

- `services/user-service` và `services/auth-service`:
  - Quản lý user profiles, preferences, xác thực, bcrypt cho hashing mật khẩu.

**Công nghệ và phụ thuộc (tóm tắt)**

- Node.js >=18, npm >=9
- TypeScript, ts-node/tsx cho dev
- Frontend: React 18, Vite, Ant Design, Mapbox
- Backend: Express, Helmet, CORS, Morgan
- AI/ML: OpenAI SDK (`openai`), Google GenAI (`@google/genai`), Transformers local (`@xenova/transformers`), embeddings (`@themaximalist/embeddings.js`)
- Vector DB: Chroma (local sqlite files under `chroma_data`)
- DB: PostgreSQL (schema documented)
- Auth/Security: `bcrypt` cho hashing; Helmet; CORS; JWT tokens (nếu có trong `auth-service`)
- Messaging/Integration: Zalo API (`zalo-api-final`), WebSocket (`socket.io-client`)
- Dev tooling: ESLint, Prettier, concurrently
- Containerization: Docker, docker-compose; k8s manifests under `infra/k8s`

**Dữ liệu và schema**

- Tài liệu `docs/FULL_DATABASE_SCHEMA.md` mô tả chi tiết các bảng: `user_profiles`, `travel_preferences`, `trips`, `bookings`, `itineraries`, `chat_sessions`, `chat_messages`, `booking_conversations`, v.v.
- Thiết kế tập trung trên UUID keys, `jsonb` cho các trường phức tạp (destination, details, metadata).
- Lưu lịch sử chat và conversation để audit và rebuilding context cho AI.

**Thành phần AI, mô hình và luồng xử lý**

- Luồng chính:
  1. Gọi API từ UI -> `ai-service` với intent và user context.
  2. `ai-service` thu thập context: user profile, trip hiện tại, lịch sử chat.
  3. Thực hiện semantic retrieval: query vector store (Chroma) bằng embeddings của prompt để lấy các đoạn context liên quan.
  4. Hình thành prompt template (system + user + retrieved context + instructions) và gửi tới LLM.
  5. LLM trả về kết quả: đề xuất itinerary, tin nhắn đàm phán, hay form đặt chỗ. Kết quả được post-process và lưu log.
  6. Nếu cần, gọi `zalo-api-final` để giao tiếp với nhà cung cấp, lưu `booking_conversations`.

- Mô hình:
  - Hỗ trợ nhiều backend model: OpenAI (`openai`), Google GenAI (`@google/genai`) và tùy chọn local inference (`@xenova/transformers`) để chạy các mô hình nhỏ trên server nếu cần.
  - Embeddings: `@themaximalist/embeddings.js` để encode văn bản và lưu vào Chroma.

- Prompt engineering:
  - Sử dụng template chứa:
    - System instruction: vai trò AI (travel assistant), constraints (tone, response format), safety filters.
    - User instruction: yêu cầu cụ thể (ví dụ: generate 3-day itinerary for family with budget X).
    - Context: trip details, user preferences, retrieved docs.
    - Output spec: JSON schema hoặc markdown structure để dễ parse và lưu.
  - Lưu ý về token budget: tách context quan trọng, cắt ngắn các đoạn không cần thiết, ưu tiên embeddings retrieval.

- An toàn & hàm lọc:
  - Kiểm tra đầu ra để tránh rò rỉ thông tin nhạy cảm, kiểm tra dài string và validate cấu trúc JSON trước khi apply.

**Giao diện người dùng (Front-end)**

- Tính năng chính:
  - Dashboard chuyến đi, timeline/itinerary editor (drag-and-drop via `react-beautiful-dnd`).
  - Form tạo chuyến, quản lý participants.
  - Chat UI tích hợp AI và lịch sử message.

- Patterns:
  - `react-query` cho data fetching và caching.
  - `zod` cho validation client-side.

**Hệ thống vận hành, triển khai và hạ tầng**

- Local development:
  - Monorepo scripts: `npm run dev` ở root chạy các service và web cùng lúc (sử dụng `concurrently`).
  - `docker-compose.yml` chứa config để chạy DB và services trong container.

- Production:
  - Có thư mục `infra/k8s` chứa manifests (Deployment, Service, ConfigMap, Secret templates).
  - Có `terraform/` skeleton để quản lý cloud infra.

- Lưu trữ dữ liệu:
  - PostgreSQL (managed or self-hosted) cho dữ liệu chính.
  - Chroma sqlite file trong `chroma_data` (có thể thay bằng vector DB hosted khi scale).

**Bảo mật và quản lý môi trường**

- Secrets & env:
  - `services/*/.env` files (hoặc k8s Secrets) lưu `API_KEYS`, `DATABASE_URL`, `ZALO_TOKEN`, `OPENAI_API_KEY`.
  - Cấu hình `helmet()` và `cors()` trên Express để tăng cường bảo mật HTTP.
  - Hash mật khẩu bằng `bcrypt` trước khi lưu.

- Quy tắc:
  - Không commit `.env` hoặc các khóa vào VCS.
  - Hạn chế logs chứa PII; nếu cần, mask sensitive fields.

**Kiểm thử, QA và CI/CD**

- Testing:
  - Unit tests cấu hình sẵn (`jest`) trong services (script `npm run test`).
  - Linting (`eslint`) và formatting (`prettier`) đảm bảo code style.

- CI/CD đề xuất:
  - Pipeline: lint -> test -> build -> image build -> push -> deploy
  - Sử dụng GitHub Actions / GitLab CI để cấu hình pipeline.

**Hướng dẫn chạy thử cục bộ (tóm tắt)**

1. Cài Node.js >=18, npm >=9
2. Cài Docker & docker-compose (để chạy PostgreSQL nếu muốn containerized)
3. Ở root repo:

```powershell
npm install
npm run dev
```

- `npm run dev` sẽ start web + all services theo script ở `package.json`.
- Nếu dùng Docker compose:

```powershell
docker-compose up -d
```

- Đặt biến môi trường cho các service, ví dụ cho `services/ai-service/.env`:

```
OPENAI_API_KEY=...
DATABASE_URL=postgres://user:pass@localhost:5432/travel
ZALO_ACCESS_TOKEN=...
```

**Kết luận và hướng phát triển**

- MVP đã thiết kế theo cách dễ mở rộng: monorepo, service separation, vector retrieval cho AI.
- Hướng phát triển:
  - Thay Chroma local bằng hosted vector DB (e.g., Milvus, Pinecone) khi scale.
  - Thêm message broker (RabbitMQ/Kafka) cho xử lý bất đồng bộ (booking updates, webhooks).
  - Thêm observability: Prometheus + Grafana, lỗi tracing (Sentry).
  - Thực hiện hardening bảo mật, rate-limiting và monitoring model costs.

---

**Phụ lục: file tham chiếu**

- [package.json](../package.json)
- [apps/web/package.json](../apps/web/package.json)
- [services/ai-service/package.json](../services/ai-service/package.json)
- [docs/FULL_DATABASE_SCHEMA.md](FULL_DATABASE_SCHEMA.md)
- `infra/k8s/` (k8s manifests)
- `docker-compose.yml`



*Báo cáo này được sinh tự động dựa trên nội dung hiện có trong codebase. Vui lòng kiểm tra và chỉnh sửa phần 'Người thực hiện' và các thông tin chi tiết cấu hình trước khi nộp.*
