/**
 * DTO for creating Trip from AI Agent booking
 * Called by AI Service when booking is complete
 */
export declare class CreateTripFromBookingDto {
    sessionId: string;
    userId: string;
    bookingData: {
        userContact: {
            displayName?: string;
            contactPhone: string;
            contactEmail: string;
            communicationStyle: string;
            preferredLanguage: string;
        };
        hotelContact: {
            name: string;
            zaloPhone: string;
            zaloUserId?: string;
        };
        tripDetails: {
            destination: string;
            checkInDate: string;
            checkOutDate: string;
            numberOfGuests: number;
            numberOfRooms: number;
            budgetMinPerNight: number;
            budgetMaxPerNight: number;
            totalTripBudget?: number;
            accommodationType: string;
            urgencyLevel: string;
            mustHaveAmenities: Record<string, boolean>;
            preferredAmenities?: Record<string, boolean>;
            note?: string;
        };
        messages: Array<{
            role: 'user' | 'assistant';
            content: string;
            timestamp: string;
        }>;
        agentActions?: Array<{
            intent: string;
            thought_process: string;
            messageDraft: string;
            stateSuggestion: string;
            timestamp: string;
            requiresUserConfirmation: boolean;
            paymentRequest?: any;
        }>;
        paymentInfo?: {
            amount: number;
            currency: string;
            confirmedAt: string;
            method: string;
        };
        completedAt: string;
        state: 'CONFIRMED' | 'CANCELLED';
    };
}
/**
 * Response พื้นฐาC for conversation queries
 */
export declare class ConversationResponseDto {
    conversationId: string;
    sessionId: string;
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: string;
    }>;
    agentActions: Array<any>;
    hotelContact: {
        name: string;
        zaloPhone: string;
        zaloUserId?: string;
    };
    state: string;
    timeline: {
        started: string;
        completed: string;
        duration: number;
    };
}
/**
 * Response khi tạo trip từ booking
 */
export declare class CreateTripFromBookingResponseDto {
    success: boolean;
    tripId: string;
    bookingConversationId: string;
    message: string;
}
//# sourceMappingURL=agent-booking.dto.d.ts.map