export interface SSEEvent {
    id?: string;
    event?: string;
    data?: string;
    retry?: number;
}
export interface ParsedEvent {
    [key: string]: any;
    _event?: string;
}
/**
 * Generator that yields parsed JSON events from SSE stream
 */
export declare function sseJsonEvents(url: string, headers: Record<string, string>, payload: any, timeout?: number): AsyncIterable<ParsedEvent>;
//# sourceMappingURL=sseParser.d.ts.map