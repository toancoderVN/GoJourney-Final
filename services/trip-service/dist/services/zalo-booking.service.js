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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ZaloBookingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloBookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const booking_conversation_entity_1 = require("../entities/booking-conversation.entity");
const booking_entity_1 = require("../entities/booking.entity");
const axios_1 = __importDefault(require("axios"));
const chat_service_1 = require("./chat.service");
let ZaloBookingService = ZaloBookingService_1 = class ZaloBookingService {
    conversationRepo;
    bookingRepo;
    configService;
    chatService;
    logger = new common_1.Logger(ZaloBookingService_1.name);
    aiServiceUrl;
    constructor(conversationRepo, bookingRepo, configService, chatService) {
        this.conversationRepo = conversationRepo;
        this.bookingRepo = bookingRepo;
        this.configService = configService;
        this.chatService = chatService;
        // Default to localhost:3005 if not set
        this.aiServiceUrl = this.configService.get('AI_SERVICE_URL') || 'http://localhost:3005';
    }
    /**
     * Handle incoming Zalo message from Webhook
     */
    async handleIncomingMessage(payload) {
        try {
            const { accountId, data, timestamp } = payload;
            const { uidFrom, content, idTo } = data;
            // Ignore messages from ourselves (if any)
            // Note: Zalo doesn't always send our own messages back, but safety check.
            this.logger.log(`Received message from ${uidFrom}: ${content}`);
            // 1. Find or Create Conversation
            let conversation = await this.conversationRepo.findOne({
                where: { zaloAccountId: accountId, zaloConversationId: uidFrom }
            });
            if (!conversation) {
                conversation = this.conversationRepository.create({
                    zaloAccountId: accountId,
                    zaloConversationId: uidFrom,
                    state: 'INPUT_READY',
                    sessionId: '', // Will be set when booking created
                    hotelContact: { name: 'Unknown', zaloPhone: '', zaloUserId: uidFrom },
                    bookingRequest: { userContact: {}, tripDetails: {} },
                    metadata: { history: [] }
                });
                await this.conversationRepo.save(conversation);
                this.logger.log(`Started new conversation with ${uidFrom}`);
            }
            // 2. Add to history
            const history = conversation.metadata.history || [];
            history.push({ role: 'user', content, timestamp });
            conversation.metadata.history = history;
            // SYNC with ChatSession (Hybrid Approach)
            await this.syncWithChatSession(conversation, 'user', content);
            // 3. Classify Intent (using AI Service)
            const classification = await this.classifyIntent(content);
            this.logger.log(`Intent: ${classification.intent}, Should Reply: ${classification.shouldAutoReply}`);
            // 4. State Machine & Response Generation
            if (classification.shouldAutoReply) {
                // Generate AI Response
                const aiResponse = await this.generateResponse(content, history);
                if (aiResponse) {
                    // Send back to Zalo
                    await this.sendZaloMessage(accountId, uidFrom, aiResponse);
                    // Save bot reply to history
                    history.push({ role: 'assistant', content: aiResponse, timestamp: Date.now() });
                    conversation.metadata.history = history;
                    await this.conversationRepo.save(conversation);
                    // SYNC bot reply
                    await this.syncWithChatSession(conversation, 'assistant', aiResponse);
                }
            }
            else {
                // Perform manual saving or alert logic here
                await this.conversationRepo.save(conversation);
            }
        }
        catch (error) {
            this.logger.error('Error handling incoming message:', error);
        }
    }
    /**
     * Call AI Service to classify intent
     */
    async classifyIntent(message) {
        try {
            const response = await axios_1.default.post(`${this.aiServiceUrl}/api/v1/chat/classify`, {
                message
            });
            return response.data?.data || { intent: 'unknown', shouldAutoReply: false };
        }
        catch (error) {
            this.logger.error('Failed to classify intent:', error.message);
            return { intent: 'unknown', shouldAutoReply: false }; // Fail safe
        }
    }
    /**
     * Call AI Service to generate response
     */
    async generateResponse(message, history) {
        try {
            const response = await axios_1.default.post(`${this.aiServiceUrl}/api/v1/chat/send`, {
                message,
                context: history.map(h => ({ sender: h.role, content: h.content }))
            });
            return response.data?.choices?.[0]?.message?.content || '';
        }
        catch (error) {
            this.logger.error('Failed to generate response:', error.message);
            return '';
        }
    }
    /**
     * Send message to Zalo via AI Service Gateway
     */
    async sendZaloMessage(accountId, userId, message) {
        try {
            await axios_1.default.post(`${this.aiServiceUrl}/api/v1/zalo/send-message`, {
                accountId,
                userId,
                message
            });
            this.logger.log(`Sent Zalo message to ${userId}`);
        }
        catch (error) {
            this.logger.error('Failed to send Zalo message:', error.message);
        }
    }
    /**
     * Sync BookingConversation to standard ChatSession
     * so it can be viewed in the Chat UI
     */
    async syncWithChatSession(conversation, role, content) {
        try {
            // Ensure system session exists
            await this.chatService.ensureSystemSession(conversation.id, `Zalo: ${conversation.hotelContact?.name || conversation.zaloConversationId || 'Guest'}`);
            // Add message to standard chat history
            await this.chatService.addMessage(conversation.id, role, content);
        }
        catch (error) {
            this.logger.error('Failed to sync chat session:', error);
        }
    }
};
exports.ZaloBookingService = ZaloBookingService;
exports.ZaloBookingService = ZaloBookingService = ZaloBookingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_conversation_entity_1.BookingConversation)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        chat_service_1.ChatService])
], ZaloBookingService);
//# sourceMappingURL=zalo-booking.service.js.map