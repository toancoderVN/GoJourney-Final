import { Trip } from './trip.entity';
/**
 * BookingConversation Entity
 * Lưu trữ lịch sử chat giữa AI Agent và khách sạn qua Zalo
 * Được tạo tự động khi AI Service hoàn thành booking
 */
export declare class BookingConversation {
    id: string;
    tripId: string;
    trip: Trip;
    sessionId: string;
    aiServiceSessionId: string;
    zaloAccountId: string;
    zaloConversationId: string;
    hotelContact: {
        name: string;
        zaloPhone: string;
        zaloUserId?: string;
    };
    bookingRequest: {
        userContact: {
            displayName?: string;
            contactPhone: string;
            contactEmail: string;
            communicationStyle: string;
            preferredLanguage: string;
        };
        tripDetails: {
            destination: string;
            checkInDate: string;
            checkOutDate: string;
            numberOfGuests: number;
            numberOfRooms: number;
            budgetMinPerNight: number;
            budgetMaxPerNight: number;
            accommodationType: string;
            urgencyLevel: string;
            mustHaveAmenities: Record<string, boolean>;
            preferredAmenities?: Record<string, boolean>;
            note?: string;
        };
    };
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: string;
    }>;
    agentActions: Array<{
        intent: string;
        thought_process: string;
        messageDraft: string;
        stateSuggestion: string;
        timestamp: string;
        requiresUserConfirmation: boolean;
        paymentRequest?: any;
    }>;
    paymentInfo: {
        amount: number;
        currency: string;
        confirmedAt: string;
        method: string;
    } | null;
    state: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}
//# sourceMappingURL=booking-conversation.entity.d.ts.map