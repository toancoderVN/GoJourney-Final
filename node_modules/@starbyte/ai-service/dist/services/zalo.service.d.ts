export declare class ZaloService {
    private zaloInstances;
    private loginSessions;
    constructor();
    private getCredentialsPath;
    private ensureCredentialsDir;
    getZaloInstance(accountId: string, skipAutoLogin?: boolean): Promise<any>;
    sendMessage(accountId: string, userId: string | null, groupId: string | null, message: string): Promise<any>;
}
export declare const zaloService: ZaloService;
//# sourceMappingURL=zalo.service.d.ts.map