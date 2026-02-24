import { AzureAIService } from './azure-ai.service';
import { BookingState } from '../types/agent.types';
import { buildTravelerPrompt } from '../prompts/traveler-agent.prompt';
import { sessionStore } from '../rag/sessionStore';
import { findZaloUserByPhone } from './zalo-lookup.service';
import { zaloService } from './zalo.service';
import { internalStartListener } from '../controllers/zalo.controller';
import { tripIntegrationService } from './trip-integration.service';
export class BookingOrchestrator {
    azureAIService;
    // In-memory state store for MVP. In production, use Redis/DB.
    conversationStates = new Map();
    conversationContext = new Map(); // Store bookingRequest, etc.
    constructor(azureAIService) {
        this.azureAIService = azureAIService || new AzureAIService(process.env.ENDPOINT || 'https://models.github.ai/inference', process.env.GITHUB_TOKEN || '', process.env.MODEL_NAME || 'openai/gpt-4o-mini');
    }
    // Check if session has active booking conversation
    hasActiveSession(sessionId) {
        return this.conversationStates.has(sessionId);
    }
    async handleBookingRequest(sessionId, bookingRequest, history = []) {
        console.log(`[Orchestrator] Handling booking request for session ${sessionId}`);
        // 1. Initialize or Update State/Context
        if (!this.conversationStates.has(sessionId)) {
            this.conversationStates.set(sessionId, BookingState.INPUT_READY);
        }
        // Critical: Update context if new data arrives, otherwise use existing.
        if (bookingRequest) {
            console.log('[Orchestrator] Updating Context with new Booking Data');
            this.conversationContext.set(sessionId, bookingRequest);
        }
        // ✅ FIX: Load context from sessionStore if not in memory
        let currentContext = this.conversationContext.get(sessionId);
        if (!currentContext) {
            console.log('[Orchestrator] Context not in memory, loading from sessionStore...');
            const session = sessionStore.getSession(sessionId);
            if (session?.context) {
                currentContext = session.context;
                this.conversationContext.set(sessionId, currentContext); // Cache it
                console.log('[Orchestrator] ✅ Context loaded from sessionStore');
            }
            else {
                currentContext = {};
                console.warn('[Orchestrator] ⚠️ No context found in sessionStore either');
            }
        }
        // 2. Build comprehensive prompt with full context + history + RAG
        const userId = currentContext.userContact?.userId || currentContext.userId;
        const systemPrompt = await buildTravelerPrompt(currentContext, history, userId, sessionId);
        // 3. Call AI
        console.log('[Orchestrator] Calling Azure AI with Context...');
        const response = await this.azureAIService.generateChatResponse(history, 'vi', systemPrompt);
        // 4. Parse AI Action (Expect JSON)
        let action;
        try {
            // Clean markdown if present
            const cleanContent = response.content.replace(/```json\n?|```/g, '').trim();
            action = JSON.parse(cleanContent);
            console.log(`[Orchestrator] AI Action decoded:`, action);
        }
        catch (e) {
            console.error('[Orchestrator] Failed to parse AI JSON', e);
            // Fallback: AI failed to follow instructions
            return {
                id: Date.now().toString(),
                content: "Xin lỗi, hệ thống đang gặp sự cố xử lý. Vui lòng thử lại.",
                type: 'error'
            };
        }
        // 5. Execute Action based on Intent
        const userAccount = currentContext.userContact?.zaloAccountId || 'default';
        return await this.executeAction(sessionId, userAccount, action);
    }
    // PHASE 5: Expose getContext for webhook to access hotel contact info
    getContext(sessionId) {
        return this.conversationContext.get(sessionId);
    }
    async executeAction(sessionId, userAccountId, action) {
        const context = this.conversationContext.get(sessionId);
        // Save state transition
        this.conversationStates.set(sessionId, action.stateSuggestion);
        switch (action.intent) {
            case 'NEGOTIATE':
                // SEND MESSAGE TO ZALO
                if (action.messageDraft) {
                    try {
                        // Get booking context to extract hotel contact and user Zalo account
                        const context = this.conversationContext.get(sessionId);
                        if (!context) {
                            throw new Error('No context found for session');
                        }
                        // Get hotel contact info from context
                        const hotelZaloPhone = context.hotelContact?.zaloPhone || context.tripDetails?.hotelContactPhone;
                        if (!hotelZaloPhone) {
                            throw new Error('Hotel Zalo contact not found in context');
                        }
                        // Get user's Zalo account ID (assumed to be same as userId for MVP)
                        const userAccountId = context.userContact?.zaloAccountId || 'default';
                        console.log(`[Orchestrator] Sending to ${context.hotelContact?.name || 'Hotel'} (${hotelZaloPhone})`);
                        console.log(`[Orchestrator] Message: "${action.messageDraft}"`);
                        // ✅ NEW: Lookup Zalo UID from phone number
                        const hotelContact = await findZaloUserByPhone(userAccountId, hotelZaloPhone);
                        if (!hotelContact || !hotelContact.uid) {
                            throw new Error(`Could not find Zalo user for phone ${hotelZaloPhone}. Make sure the number is registered on Zalo.`);
                        }
                        console.log(`[Orchestrator] ✅ Resolved phone ${hotelZaloPhone} → Zalo UID: ${hotelContact.uid}`);
                        // ✅ STORE UID in context for webhook session matching
                        const updatedContext = this.conversationContext.get(sessionId);
                        console.log(`[Orchestrator] DEBUG: updatedContext exists? ${!!updatedContext}, has hotelContact? ${!!updatedContext?.hotelContact}`);
                        if (updatedContext && updatedContext.hotelContact) {
                            updatedContext.hotelContact.zaloUserId = hotelContact.uid;
                            this.conversationContext.set(sessionId, updatedContext);
                            // Also update sessionStore
                            const session = sessionStore.getSession(sessionId);
                            if (session && session.context && session.context.hotelContact) {
                                session.context.hotelContact.zaloUserId = hotelContact.uid;
                                sessionStore.saveSession(sessionId, session);
                                console.log(`[Orchestrator] 💾 Stored UID ${hotelContact.uid} in session context`);
                            }
                            else {
                                console.warn(`[Orchestrator] ⚠️ Could not save UID to sessionStore - session or context missing`);
                            }
                        }
                        else {
                            console.warn(`[Orchestrator] ⚠️ Cannot store UID - context or hotel contact missing`);
                        }
                        // Send message via Zalo service
                        await zaloService.sendMessage(userAccountId, // User's Zalo account
                        hotelContact.uid, // Hotel's Zalo UID (not phone!)
                        null, // Not a group message
                        action.messageDraft);
                        console.log(`[Orchestrator] ✅ Message sent successfully via Zalo`);
                        // ✅ AUTO-START LISTENER to receive hotel replies
                        try {
                            await internalStartListener(userAccountId);
                            console.log(`[Orchestrator] ✅ Zalo listener auto-started for ${userAccountId}`);
                        }
                        catch (listenerError) {
                            // Listener might already be running, that's OK
                            console.log(`[Orchestrator] Listener status: ${listenerError.message}`);
                        }
                    }
                    catch (error) {
                        console.error('[Orchestrator] ❌ Failed to send Zalo message:', error.message);
                        // Don't throw - continue for MVP, just log the error
                    }
                }
                // Return agent message (shown in UI as "Agent is messaging hotel...")
                return {
                    id: Date.now().toString(),
                    content: `(Agent đang nhắn tin cho khách sạn): "${action.messageDraft}"`,
                    type: 'text',
                    data: {
                        agentState: action.stateSuggestion,
                        isAgentActive: true
                    }
                };
            case 'REQUEST_PAYMENT':
                // Show payment confirmation UI with actual payment details
                return {
                    id: Date.now().toString(),
                    content: action.messageDraft || 'Vui lòng xác nhận thanh toán',
                    type: 'booking_payment_request',
                    data: {
                        agentState: action.stateSuggestion,
                        isAgentActive: false,
                        paymentInfo: action.paymentRequest || {
                            summary: 'Vui lòng xác nhận để tiếp tục đặt phòng',
                            requiresApproval: true
                        }
                    },
                    requiresUserApproval: true,
                    paymentInfo: action.paymentRequest // Pass payment details to frontend
                };
            case 'FINISH':
            case 'CANCEL':
                // 🆕 NEW: Update session state in sessionStore trước khi delete từ memory
                const finalState = action.intent === 'FINISH' ? BookingState.CONFIRMED : BookingState.CANCELLED;
                sessionStore.updateSessionState(sessionId, finalState);
                this.conversationStates.delete(sessionId);
                // Handle FINISH - Send final message to hotel first
                if (action.intent === 'FINISH' && action.messageDraft) {
                    console.log('[Orchestrator] 🎉 FINISH - Sending final message to hotel');
                    const context = this.conversationContext.get(sessionId);
                    if (context) {
                        const hotelZaloPhone = context.hotelContact?.zaloPhone || context.hotelContact?.phone;
                        const userAccountId = context.userContact?.zaloAccountId || 'default';
                        if (hotelZaloPhone) {
                            try {
                                const hotelContact = await findZaloUserByPhone(userAccountId, hotelZaloPhone);
                                if (hotelContact && hotelContact.uid) {
                                    await zaloService.sendMessage(userAccountId, hotelContact.uid, null, action.messageDraft);
                                    console.log('[Orchestrator] ✅ Final message sent to hotel');
                                }
                            }
                            catch (err) {
                                console.error('[Orchestrator] ⚠️ Failed to send final message:', err);
                            }
                        }
                    }
                    // 🆕 NEW: Save booking to Trip Service
                    try {
                        const result = await tripIntegrationService.saveTripAfterBooking(sessionId);
                        if (result) {
                            console.log('[Orchestrator] ✅ Trip saved to Trip Service:', result.tripId);
                        }
                        else {
                            console.warn('[Orchestrator] ⚠️ Trip save failed, but booking succeeded from user perspective');
                        }
                    }
                    catch (tripError) {
                        console.error('[Orchestrator] ⚠️ Trip integration error:', tripError.message);
                        // Don't fail booking if trip save fails - user perspective is booking succeeded
                    }
                }
                return {
                    id: Date.now().toString(),
                    content: action.intent === 'FINISH' ? 'Đã đặt phòng thành công! Chúc bạn có chuyến đi vui vẻ! 🎉' : 'Đã hủy yêu cầu.',
                    type: 'text'
                };
            case 'REQUEST_PAYMENT':
                // Agent is requesting user to confirm payment
                return {
                    id: Date.now().toString(),
                    content: action.messageDraft || 'Agent đang yêu cầu xác nhận thanh toán',
                    type: 'booking_payment_request',
                    data: {
                        agentState: action.stateSuggestion,
                        isAgentActive: false,
                        paymentInfo: action.paymentRequest || {
                            summary: 'Vui lòng xác nhận để tiếp tục đặt phòng',
                            requiresApproval: true
                        }
                    },
                    requiresUserApproval: true,
                    paymentInfo: action.paymentRequest
                };
            case 'CONFIRM_PAYMENT':
                // User has confirmed payment, proceed with booking
                return {
                    id: Date.now().toString(),
                    content: 'Đã xác nhận thanh toán. Đang hoàn tất đặt phòng...',
                    type: 'text',
                    data: {
                        agentState: BookingState.CONFIRMED,
                        paymentConfirmed: true
                    }
                };
            case 'PAYMENT_REQUIRED':
                return {
                    id: Date.now().toString(),
                    content: "Action unhandled.",
                    type: 'error'
                };
        }
    }
}
// Export singleton instance
export const bookingOrchestrator = new BookingOrchestrator();
//# sourceMappingURL=booking.orchestrator.js.map