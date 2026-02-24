import { BookingType, BookingStatus } from '../types';
import { Trip } from './trip.entity';
import { Provider } from './provider.entity';
export declare class Booking {
    id: string;
    tripId: string;
    providerId: string;
    type: BookingType;
    status: BookingStatus;
    providerBookingRef: string;
    details: any;
    price: {
        amount: number;
        currency: string;
        breakdown?: {
            base: number;
            taxes: number;
            fees: number;
            discounts: number;
        };
    };
    passengers?: Array<{
        type: 'adult' | 'child' | 'infant';
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        passport?: {
            number: string;
            countryCode: string;
            expiryDate: Date;
        };
    }>;
    confirmationCode?: string;
    holdExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    trip: Trip;
    provider: Provider;
}
//# sourceMappingURL=booking.entity.d.ts.map