import { BookingState } from "../types/agent.types";
export interface SessionData {
    sessionId: string;
    userId: string;
    state: BookingState;
    context: any;
    history: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: string;
    }>;
    createdAt: string;
    updatedAt: string;
}
/**
 * In-memory session store (MVP)
 * TODO: Replace with Redis for production
 */
declare class SessionStore {
    private sessions;
    /**
     * Save or update session
     */
    saveSession(sessionId: string, data: Partial<SessionData>): SessionData;
    /**
     * Get session by ID
     */
    getSession(sessionId: string): SessionData | null;
    /**
     * Update session state (FSM transition)
     */
    updateSessionState(sessionId: string, newState: BookingState): void;
    /**
     * Add message to history
     */
    addMessageToHistory(sessionId: string, role: 'user' | 'assistant', content: string): void;
    /**
     * Delete session
     */
    deleteSession(sessionId: string): boolean;
    /**
     * Get all sessions for a user
     */
    getUserSessions(userId: string): SessionData[];
    /**
     * Set hotel mapping for a session (Phase 4)
     * Store hotel phone in session context for reverse lookup
     */
    setHotelMapping(sessionId: string, hotelPhone: string): void;
    /**
     * Find session by hotel contact (Phase 4)
     * Used by webhook to identify which session a hotel reply belongs to
     * Can search by either phone number or Zalo UID
     *
     * FIXED: Now finds the MOST RECENT ACTIVE session instead of first match
     * This prevents old sessions from "stealing" hotel replies
     */
    findSessionByHotel(accountId: string, hotelIdentifier: string): string | null;
}
export declare const sessionStore: SessionStore;
export {};
//# sourceMappingURL=sessionStore.d.ts.map