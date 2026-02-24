import { BookingType, BookingStatus } from '../types';
export declare class CreateBookingDto {
    tripId: string;
    type: BookingType;
    providerName: string;
    providerReference: string;
    serviceName?: string;
    amount?: number;
    currency?: string;
    bookingDetails?: any;
    confirmationData?: any;
}
export declare class UpdateBookingDto {
    status?: BookingStatus;
    serviceName?: string;
    amount?: number;
    currency?: string;
    bookingDetails?: any;
    confirmationData?: any;
}
//# sourceMappingURL=booking.dto.d.ts.map