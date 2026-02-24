interface DeepResearchLog {
    timestamp: string;
    sessionId: string;
    query: string;
    events: Array<{
        timestamp: string;
        type: string;
        data: any;
    }>;
    finalResult?: {
        content: string;
        contentLength: number;
        summaryContent?: string;
        mainContent?: string;
        agentBasedSeparation?: boolean;
        rawCompleteContent?: string;
        originalContent?: string;
        sources: string[];
        success: boolean;
    };
}
declare class DeepResearchLogger {
    private logsDir;
    private currentSession;
    constructor();
    private ensureLogsDirectory;
    startSession(query: string): string;
    logEvent(type: string, data: any): void;
    endSession(finalResult: {
        content: string;
        contentLength: number;
        rawCompleteContent?: string;
        originalContent?: string;
        sources: string[];
        success: boolean;
    }): void;
    private saveCurrentSession;
    getLogsByDate(date: string): DeepResearchLog[];
    getRecentLogs(limit?: number): DeepResearchLog[];
}
export declare const deepResearchLogger: DeepResearchLogger;
export {};
//# sourceMappingURL=deepResearchLogger.d.ts.map