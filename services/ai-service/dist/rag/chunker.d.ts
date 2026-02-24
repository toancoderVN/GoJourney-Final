/**
 * Chunk booking context into semantic pieces for better embedding quality
 */
export interface BookingContext {
    userContact?: {
        displayName?: string;
        contactPhone?: string;
        contactEmail?: string;
        communicationStyle?: string;
        preferredLanguage?: string;
    };
    tripDetails?: {
        destination?: string;
        checkInDate?: string;
        checkOutDate?: string;
        numberOfGuests?: number;
        numberOfRooms?: number;
        urgencyLevel?: string;
        budgetMinPerNight?: number;
        budgetMaxPerNight?: number;
        accommodationType?: string;
        mustHaveAmenities?: Record<string, boolean>;
        preferredAmenities?: Record<string, boolean>;
        note?: string;
    };
}
export interface Chunk {
    text: string;
    chunkType: string;
}
/**
 * Chunk booking context into semantic pieces
 */
export declare function chunkBookingContext(context: BookingContext): Chunk[];
//# sourceMappingURL=chunker.d.ts.map