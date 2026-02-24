// Actually this project uses Express/manual instantiation based on other files.
// So I will just make a class export.
import { Zalo, ThreadType } from 'zalo-api-final';
import fs from 'fs';
import path from 'path';
export class ZaloService {
    zaloInstances = new Map();
    loginSessions = new Map();
    constructor() { }
    // Helper function to get credentials file path
    getCredentialsPath(accountId) {
        return path.join(process.cwd(), 'zalo-credentials', `${accountId}.json`);
    }
    // Helper function to ensure credentials directory exists
    ensureCredentialsDir() {
        const dir = path.join(process.cwd(), 'zalo-credentials');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
    // Helper function to get or create Zalo instance
    async getZaloInstance(accountId, skipAutoLogin = false) {
        if (!this.zaloInstances.has(accountId)) {
            const zalo = new Zalo({
                logging: false,
                selfListen: false,
                checkUpdate: false
            });
            this.zaloInstances.set(accountId, zalo);
            // Try to auto-login from credentials if exists (skip for QR login)
            if (!skipAutoLogin) {
                const credPath = this.getCredentialsPath(accountId);
                if (fs.existsSync(credPath)) {
                    try {
                        const data = JSON.parse(fs.readFileSync(credPath, 'utf8'));
                        const api = await zalo.login(data);
                        // @ts-ignore
                        zalo.api = api;
                        console.log(`✅ Auto-login successful for ${accountId}`);
                    }
                    catch (error) {
                        console.log(`⚠️ Auto-login failed for ${accountId}:`, error);
                    }
                }
            }
        }
        return this.zaloInstances.get(accountId);
    }
    async sendMessage(accountId, userId, groupId, message) {
        const zalo = await this.getZaloInstance(accountId);
        // @ts-ignore
        if (!zalo.api) {
            throw new Error('Not logged in');
        }
        const threadId = userId || groupId;
        if (!threadId)
            throw new Error('Target required');
        const threadType = groupId ? ThreadType.Group : ThreadType.User;
        // @ts-ignore
        return await zalo.api.sendMessage(message, threadId, threadType);
    }
}
export const zaloService = new ZaloService();
//# sourceMappingURL=zalo.service.js.map