import { Request, Response } from 'express';
/**
 * Non-streaming deep research endpoint
 */
export declare const deepResearch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Streaming deep research endpoint using Server-Sent Events (SSE)
 * Streams thinking + content + sources in real-time
 */
export declare const deepResearchStream: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=deepResearch.controller.d.ts.map