export interface ZaloContactInfo {
    phone: string;
    uid: string;
    displayName: string;
    avatar?: string;
    lastUpdated: Date;
}
/**
 * Find Zalo user by phone number
 * Uses zalo-api-final's findUser method
 */
export declare function findZaloUserByPhone(accountId: string, phoneNumber: string): Promise<ZaloContactInfo | null>;
/**
 * Get cached contact info without API call
 */
export declare function getCachedContact(phoneNumber: string): ZaloContactInfo | null;
/**
 * Manually add contact to cache (for testing or manual entry)
 */
export declare function cacheContact(contactInfo: ZaloContactInfo): void;
//# sourceMappingURL=zalo-lookup.service.d.ts.map