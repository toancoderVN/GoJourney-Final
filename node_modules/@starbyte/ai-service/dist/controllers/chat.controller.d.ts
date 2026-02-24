import { Request, Response } from 'express';
export declare const classifyIntent: (text: string, language?: string) => "default" | "greeting" | "trip_planning" | "hotel_search" | "flight_search";
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getQuickActions: (req: Request, res: Response) => Promise<void>;
export declare const executeQuickAction: (req: Request, res: Response) => Promise<void>;
export declare const classifyIntentHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chat.controller.d.ts.map