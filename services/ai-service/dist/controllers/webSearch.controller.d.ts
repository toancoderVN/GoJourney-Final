import { Request, Response } from 'express';
/**
 * Non-streaming web search endpoint
 */
export declare const webSearch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Streaming web search endpoint using Server-Sent Events (SSE)
 * Streams text chunks to client in real-time
 */
export declare const webSearchStream: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=webSearch.controller.d.ts.map