import { Request, Response } from 'express';
export declare const getZaloInstance: (accountId: string, skipAutoLogin?: boolean) => Promise<any>;
/**
 * POST /api/v1/zalo/login-qr
 * Generate QR code for Zalo login
 */
export declare const generateLoginQR: (req: Request, res: Response) => Promise<void>;
/**
 * GET /api/v1/zalo/login-status/:accountId
 * Get current login status and QR code
 */
export declare const getLoginStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * GET /api/v1/zalo/account-info/:accountId
 * Get detailed account information for connected Zalo account
 */
export declare const getAccountInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * DELETE /api/v1/zalo/account/:accountId
 * Disconnect Zalo account
 */
export declare const disconnectAccount: (req: Request, res: Response) => Promise<void>;
/**
 * GET /api/v1/zalo/conversations/:accountId
 * Get list of conversations (friends + groups)
 */
export declare const getConversations: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * GET /api/v1/zalo/auto-restore/:accountId
 * Auto-restore Zalo session from saved credentials
 */
export declare const autoRestoreSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * POST /api/v1/zalo/send-message
 * Send message to a user or group
 */
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * POST /api/v1/zalo/start-listener
 * Start real-time message listener for an account
 */
export declare const internalStartListener: (accountId: string, webhookUrl?: string) => Promise<string>;
export declare const startListener: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * POST /api/v1/zalo/stop-listener
 * Stop listener
 */
export declare const stopListener: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * GET /api/v1/zalo/health
 * Health check for Zalo integration
 */
export declare const healthCheck: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=zalo.controller.d.ts.map