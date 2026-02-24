import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Trip } from '../entities/trip.entity';
import { Itinerary } from '../entities/itinerary.entity';
import { Booking } from '../entities/booking.entity';
import { Provider } from '../entities/provider.entity';
export declare class SeedData {
    static run(dataSource: DataSource): Promise<void>;
    static seedUsers(dataSource: DataSource): Promise<User[]>;
    static seedProviders(dataSource: DataSource): Promise<Provider[]>;
    static seedTrips(dataSource: DataSource, users: User[]): Promise<Trip[]>;
    static seedItineraries(dataSource: DataSource, trips: Trip[]): Promise<(Itinerary & Itinerary[])[]>;
    static seedBookings(dataSource: DataSource, trips: Trip[], providers: Provider[]): Promise<Booking[]>;
}
//# sourceMappingURL=seed-data.d.ts.map