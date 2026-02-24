"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_session_entity_1 = require("../entities/chat-session.entity");
const chat_message_entity_1 = require("../entities/chat-message.entity");
let ChatService = class ChatService {
    chatSessionRepository;
    chatMessageRepository;
    constructor(chatSessionRepository, chatMessageRepository) {
        this.chatSessionRepository = chatSessionRepository;
        this.chatMessageRepository = chatMessageRepository;
    }
    async ensureSystemSession(id, title) {
        let session = await this.chatSessionRepository.findOne({ where: { id } });
        if (!session) {
            session = this.chatSessionRepository.create({
                id, // Force ID to match BookingConversation
                userId: 'system-agent', // Shared user ID for system agents
                title,
                messages: [],
            });
            await this.chatSessionRepository.save(session);
        }
        return session;
    }
    async createSession(userId, title = 'New Chat') {
        const session = this.chatSessionRepository.create({
            userId,
            title,
            messages: [],
        });
        return await this.chatSessionRepository.save(session);
    }
    async getUserSessions(userId) {
        const sessions = await this.chatSessionRepository.find({
            where: { userId },
            order: { updatedAt: 'DESC' },
            relations: ['messages'],
        });
        return sessions;
    }
    async getSession(id, userId) {
        const session = await this.chatSessionRepository.findOne({
            where: [
                { id, userId },
                { id, userId: 'system-agent' }
            ],
            relations: ['messages'],
        });
        if (!session) {
            throw new common_1.NotFoundException(`Chat session ${id} not found`);
        }
        // Sort messages by timestamp
        if (session.messages) {
            session.messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        }
        return session;
    }
    async getMessages(sessionId) {
        const messages = await this.chatMessageRepository.find({
            where: { sessionId },
            order: { timestamp: 'ASC' },
        });
        return messages;
    }
    async addMessage(sessionId, role, content, metadata) {
        const message = this.chatMessageRepository.create({
            sessionId,
            role: role,
            content,
            metadata,
        });
        const savedMessage = await this.chatMessageRepository.save(message);
        // Update session updatedAt
        await this.chatSessionRepository.update(sessionId, { updatedAt: new Date() });
        return savedMessage;
    }
    async updateSessionTitle(id, userId, title) {
        const session = await this.getSession(id, userId);
        // session is ChatSession (interface). We need to save it. 
        // But repository expects Entity.
        // We should fetch entity again or cast.
        // Better: use update
        await this.chatSessionRepository.update({ id, userId }, { title });
        return await this.getSession(id, userId);
    }
    async deleteSession(id, userId) {
        const result = await this.chatSessionRepository.delete({ id, userId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Chat session ${id} not found`);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_session_entity_1.ChatSessionEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(chat_message_entity_1.ChatMessageEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map