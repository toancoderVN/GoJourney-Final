export declare enum BookingState {
    INPUT_READY = "INPUT_READY",
    CONTACTING_HOTEL = "CONTACTING_HOTEL",
    NEGOTIATING = "NEGOTIATING",
    WAITING_USER_CONFIRM_PAYMENT = "WAITING_USER_CONFIRM_PAYMENT",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}
export interface PaymentRequest {
    amount: number;
    currency: string;
    description: string;
    paymentType: 'deposit' | 'full' | 'other';
}
export type AgentIntent = 'NEGOTIATE' | 'REQUEST_PAYMENT' | 'CONFIRM_PAYMENT' | 'PAYMENT_REQUIRED' | 'FINISH' | 'CANCEL';
export interface AgentAction {
    intent: AgentIntent;
    thought_process: string;
    stateSuggestion: BookingState;
    messageDraft: string | null;
    requiresUserConfirmation: boolean;
    paymentRequest: PaymentRequest | null;
}
//# sourceMappingURL=agent.types.d.ts.map