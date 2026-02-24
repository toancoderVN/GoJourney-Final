import { ZaloBookingService } from '../services/zalo-booking.service';
export declare class ZaloWebhookController {
    private readonly zaloBookingService;
    private readonly logger;
    constructor(zaloBookingService: ZaloBookingService);
    handleWebhook(payload: any): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=zalo-webhook.controller.d.ts.map