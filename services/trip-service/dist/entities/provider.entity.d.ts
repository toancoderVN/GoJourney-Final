import { ProviderType } from '../types';
export declare class Provider {
    id: string;
    name: string;
    type: ProviderType;
    config: {
        apiKey: string;
        baseUrl: string;
        rateLimit: {
            requestsPerMinute: number;
            requestsPerHour: number;
        };
        timeout: number;
        retries: number;
        sandbox?: boolean;
    };
    isActive: boolean;
    priority: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=provider.entity.d.ts.map