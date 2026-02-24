"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedData = void 0;
const user_entity_1 = require("../entities/user.entity");
const trip_entity_1 = require("../entities/trip.entity");
const itinerary_entity_1 = require("../entities/itinerary.entity");
const itinerary_item_entity_1 = require("../entities/itinerary-item.entity");
const booking_entity_1 = require("../entities/booking.entity");
const provider_entity_1 = require("../entities/provider.entity");
const types_1 = require("../types");
class SeedData {
    static async run(dataSource) {
        console.log('🌱 Starting database seeding...');
        try {
            // Clear existing data
            await dataSource.query('TRUNCATE TABLE bookings, itinerary_items, itineraries, trips, providers, users RESTART IDENTITY CASCADE');
            console.log('✅ Cleared existing data');
            // Seed Users
            const users = await SeedData.seedUsers(dataSource);
            console.log(`✅ Seeded ${users.length} users`);
            // Seed Providers
            const providers = await SeedData.seedProviders(dataSource);
            console.log(`✅ Seeded ${providers.length} providers`);
            // Seed Trips
            const trips = await SeedData.seedTrips(dataSource, users);
            console.log(`✅ Seeded ${trips.length} trips`);
            // Seed Itineraries and Items
            const itineraries = await SeedData.seedItineraries(dataSource, trips);
            console.log(`✅ Seeded ${itineraries.length} itineraries`);
            // Seed Bookings
            const bookings = await SeedData.seedBookings(dataSource, trips, providers);
            console.log(`✅ Seeded ${bookings.length} bookings`);
            console.log('🎉 Database seeding completed successfully!');
        }
        catch (error) {
            console.error('❌ Error during seeding:', error);
            throw error;
        }
    }
    static async seedUsers(dataSource) {
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const userData = [
            {
                email: 'admin@travelagent.com',
                passwordHash: '$2b$10$YourHashedPasswordHere', // bcrypt hash for 'password123'
                firstName: 'Admin',
                lastName: 'User',
                isActive: true,
                emailVerified: true,
                preferences: {
                    budgetRange: { min: 0, max: 50000000, currency: 'VND' },
                    travelStyle: [types_1.TravelStyle.LUXURY, types_1.TravelStyle.COMFORT],
                    hotelClass: types_1.HotelClass.LUXURY,
                    language: 'vi',
                    currency: 'VND',
                    timezone: 'Asia/Ho_Chi_Minh'
                }
            },
            {
                email: 'nguyen.van.a@email.com',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                firstName: 'Nguyễn Văn',
                lastName: 'A',
                isActive: true,
                emailVerified: true,
                preferences: {
                    budgetRange: { min: 5000000, max: 20000000, currency: 'VND' },
                    travelStyle: [types_1.TravelStyle.COMFORT, types_1.TravelStyle.ADVENTURE],
                    hotelClass: types_1.HotelClass.MID_RANGE,
                    language: 'vi',
                    currency: 'VND',
                    timezone: 'Asia/Ho_Chi_Minh'
                }
            },
            {
                email: 'tran.thi.b@email.com',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                firstName: 'Trần Thị',
                lastName: 'B',
                isActive: true,
                emailVerified: true,
                preferences: {
                    budgetRange: { min: 10000000, max: 30000000, currency: 'VND' },
                    travelStyle: ['luxury', 'cultural'],
                    hotelClass: 'premium',
                    language: 'vi',
                    currency: 'VND',
                    timezone: 'Asia/Ho_Chi_Minh'
                }
            },
            {
                email: 'le.van.c@email.com',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                firstName: 'Lê Văn',
                lastName: 'C',
                isActive: true,
                emailVerified: false,
                preferences: {
                    budgetRange: { min: 3000000, max: 15000000, currency: 'VND' },
                    travelStyle: ['budget', 'adventure'],
                    hotelClass: 'economy',
                    language: 'vi',
                    currency: 'VND',
                    timezone: 'Asia/Ho_Chi_Minh'
                }
            },
            {
                email: 'pham.thi.d@email.com',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                firstName: 'Phạm Thị',
                lastName: 'D',
                isActive: true,
                emailVerified: true,
                preferences: {
                    budgetRange: { min: 8000000, max: 25000000, currency: 'VND' },
                    travelStyle: ['comfort', 'cultural'],
                    hotelClass: 'standard',
                    language: 'vi',
                    currency: 'VND',
                    timezone: 'Asia/Ho_Chi_Minh'
                }
            }
        ];
        const users = userRepository.create(userData);
        return await userRepository.save(users);
    }
    static async seedProviders(dataSource) {
        const providerRepository = dataSource.getRepository(provider_entity_1.Provider);
        const providerData = [
            {
                name: 'Vietnam Airlines',
                type: 'airline',
                code: 'VN',
                isActive: true,
                config: {
                    baseUrl: 'https://api.vietnamairlines.com',
                    apiKey: 'mock-api-key',
                    timeout: 30000
                }
            },
            {
                name: 'VietJet Air',
                type: 'airline',
                code: 'VJ',
                isActive: true,
                config: {
                    baseUrl: 'https://api.vietjetair.com',
                    apiKey: 'mock-api-key',
                    timeout: 30000
                }
            },
            {
                name: 'Vinpearl Hotels',
                type: 'hotel',
                code: 'VP',
                isActive: true,
                config: {
                    baseUrl: 'https://api.vinpearl.com',
                    apiKey: 'mock-api-key',
                    timeout: 30000
                }
            },
            {
                name: 'Agoda',
                type: 'hotel',
                code: 'AG',
                isActive: true,
                config: {
                    baseUrl: 'https://api.agoda.com',
                    apiKey: 'mock-api-key',
                    timeout: 30000
                }
            },
            {
                name: 'Klook',
                type: 'activity',
                code: 'KL',
                isActive: true,
                config: {
                    baseUrl: 'https://api.klook.com',
                    apiKey: 'mock-api-key',
                    timeout: 30000
                }
            }
        ];
        const providers = providerRepository.create(providerData);
        return await providerRepository.save(providers);
    }
    static async seedTrips(dataSource, users) {
        const tripRepository = dataSource.getRepository(trip_entity_1.Trip);
        const tripData = [
            {
                name: 'Khám phá Kyoto - Osaka mùa hoa anh đào',
                destination: 'Kyoto, Osaka, Japan',
                startDate: new Date('2024-04-10'),
                endDate: new Date('2024-04-17'),
                budget: 45000000,
                currency: 'VND',
                status: 'confirmed',
                user: users[1],
                isPrivate: false,
                preferences: {
                    travelStyle: 'cultural',
                    budgetLevel: 'premium',
                    groupSize: 2,
                    interests: ['Cultural Sites', 'Food & Dining', 'Photography', 'Traditional Arts']
                },
                description: 'Hành trình khám phá vẻ đẹp truyền thống Nhật Bản qua các ngôi chùa cổ kính, khu phố geisha và ẩm thực đặc sắc trong mùa hoa anh đào.'
            },
            {
                name: 'Phiêu lưu Bali - Indonesia',
                destination: 'Bali, Indonesia',
                startDate: new Date('2024-05-20'),
                endDate: new Date('2024-05-27'),
                budget: 25000000,
                currency: 'VND',
                status: 'planning',
                user: users[2],
                isPrivate: false,
                preferences: {
                    travelStyle: 'adventure',
                    budgetLevel: 'comfort',
                    groupSize: 4,
                    interests: ['Beaches', 'Adventure Sports', 'Local Culture', 'Temples']
                },
                description: 'Trải nghiệm thiên đường nhiệt đới với những bãi biển tuyệt đẹp, văn hóa Hindu độc đáo và các hoạt động mạo hiểm thú vị.'
            },
            {
                name: 'Singapore - Malaysia 7 ngày',
                destination: 'Singapore & Kuala Lumpur',
                startDate: new Date('2024-06-15'),
                endDate: new Date('2024-06-22'),
                budget: 35000000,
                currency: 'VND',
                status: 'confirmed',
                user: users[3],
                isPrivate: false,
                preferences: {
                    travelStyle: 'comfort',
                    budgetLevel: 'standard',
                    groupSize: 3,
                    interests: ['City Tours', 'Shopping', 'Food & Dining', 'Modern Architecture']
                },
                description: 'Khám phá hai thành phố hiện đại Đông Nam Á với ẩm thực đa dạng, shopping mall cao cấp và các địa danh nổi tiếng.'
            },
            {
                name: 'Maldives - Kỳ nghỉ trăng mật',
                destination: 'Maldives',
                startDate: new Date('2024-07-10'),
                endDate: new Date('2024-07-17'),
                budget: 80000000,
                currency: 'VND',
                status: 'draft',
                user: users[4],
                isPrivate: true,
                preferences: {
                    travelStyle: 'luxury',
                    budgetLevel: 'luxury',
                    groupSize: 2,
                    interests: ['Beaches', 'Water Sports', 'Spa & Wellness', 'Romance']
                },
                description: 'Kỳ nghỉ trăng mật lãng mạn tại thiên đường nhiệt đới với resort 5 sao, villa trên nước và các trải nghiệm độc quyền.'
            },
            {
                name: 'Trekking Sapa - Fansipan',
                destination: 'Sapa, Lào Cai, Vietnam',
                startDate: new Date('2024-08-05'),
                endDate: new Date('2024-08-09'),
                budget: 12000000,
                currency: 'VND',
                status: 'planning',
                user: users[1],
                isPrivate: false,
                preferences: {
                    travelStyle: 'adventure',
                    budgetLevel: 'budget',
                    groupSize: 6,
                    interests: ['Trekking', 'Local Culture', 'Photography', 'Nature']
                },
                description: 'Chinh phục đỉnh Fansipan - nóc nhà Đông Dương và khám phá văn hóa độc đáo của các dân tộc thiểu số.'
            }
        ];
        const trips = tripRepository.create(tripData);
        return await tripRepository.save(trips);
    }
    static async seedItineraries(dataSource, trips) {
        const itineraryRepository = dataSource.getRepository(itinerary_entity_1.Itinerary);
        const itineraryItemRepository = dataSource.getRepository(itinerary_item_entity_1.ItineraryItem);
        const itineraries = [];
        const allItems = [];
        // Itinerary for Kyoto-Osaka trip
        const kyotoItinerary = itineraryRepository.create({
            trip: trips[0],
            name: 'Lịch trình Kyoto - Osaka 7 ngày',
            description: 'Chi tiết các hoạt động từng ngày'
        });
        itineraries.push(kyotoItinerary);
        const kyotoItems = [
            { day: 1, date: new Date('2024-04-10'), title: 'Bay từ Hà Nội đến Kansai', type: 'flight', time: '14:30', description: 'Chuyến bay Vietnam Airlines VN321', estimatedCost: 8000000 },
            { day: 1, date: new Date('2024-04-10'), title: 'Nhận phòng hotel Kyoto', type: 'hotel', time: '19:00', description: 'Hotel Granvia Kyoto gần ga JR', estimatedCost: 3500000 },
            { day: 2, date: new Date('2024-04-11'), title: 'Thăm đền Fushimi Inari', type: 'activity', time: '09:00', description: 'Hàng nghìn cổng Torii đỏ nổi tiếng', estimatedCost: 0 },
            { day: 2, date: new Date('2024-04-11'), title: 'Khu phố Gion', type: 'activity', time: '15:00', description: 'Tìm hiểu văn hóa Geisha', estimatedCost: 500000 },
            { day: 3, date: new Date('2024-04-12'), title: 'Đền Kinkaku-ji (Chùa Vàng)', type: 'activity', time: '10:00', description: 'Ngôi chùa phủ vàng nổi tiếng', estimatedCost: 400000 }
        ];
        // Bali itinerary items
        const baliItinerary = itineraryRepository.create({
            trip: trips[1],
            name: 'Khám phá Bali 7 ngày',
            description: 'Từ Ubud đến các bãi biển tuyệt đẹp'
        });
        itineraries.push(baliItinerary);
        // Save itineraries first
        const savedItineraries = await itineraryRepository.save(itineraries);
        // Add items with saved itinerary references
        for (let i = 0; i < kyotoItems.length; i++) {
            const item = itineraryItemRepository.create({
                ...kyotoItems[i],
                itinerary: savedItineraries[0]
            });
            allItems.push(item);
        }
        await itineraryItemRepository.save(allItems);
        return savedItineraries;
    }
    static async seedBookings(dataSource, trips, providers) {
        const bookingRepository = dataSource.getRepository(booking_entity_1.Booking);
        const bookingData = [
            {
                trip: trips[0],
                provider: providers[0], // Vietnam Airlines
                type: 'flight',
                reference: 'VN321-240410',
                status: 'confirmed',
                details: {
                    departure: 'HAN',
                    arrival: 'KIX',
                    departureTime: '2024-04-10T14:30:00Z',
                    arrivalTime: '2024-04-10T20:30:00Z',
                    flightNumber: 'VN321',
                    passengers: 2,
                    class: 'Economy'
                },
                totalAmount: 16000000,
                currency: 'VND',
                confirmedAt: new Date(),
                metadata: {
                    seats: ['12A', '12B'],
                    meal: 'Standard',
                    baggage: '23kg'
                }
            },
            {
                trip: trips[0],
                provider: providers[2], // Vinpearl
                type: 'hotel',
                reference: 'VP-KYT-240410',
                status: 'confirmed',
                details: {
                    hotelName: 'Hotel Granvia Kyoto',
                    roomType: 'Superior Twin Room',
                    checkIn: '2024-04-10T15:00:00Z',
                    checkOut: '2024-04-17T11:00:00Z',
                    nights: 7,
                    guests: 2
                },
                totalAmount: 24500000,
                currency: 'VND',
                confirmedAt: new Date(),
                metadata: {
                    roomNumber: '1205',
                    amenities: ['WiFi', 'Breakfast', 'City View'],
                    cancellationPolicy: 'Free cancellation until 24h before check-in'
                }
            },
            {
                trip: trips[2],
                provider: providers[1], // VietJet
                type: 'flight',
                reference: 'VJ803-240615',
                status: 'pending',
                details: {
                    departure: 'SGN',
                    arrival: 'SIN',
                    departureTime: '2024-06-15T08:15:00Z',
                    arrivalTime: '2024-06-15T11:30:00Z',
                    flightNumber: 'VJ803',
                    passengers: 3,
                    class: 'Economy'
                },
                totalAmount: 9000000,
                currency: 'VND'
            }
        ];
        const bookings = bookingRepository.create(bookingData);
        return await bookingRepository.save(bookings);
    }
}
exports.SeedData = SeedData;
//# sourceMappingURL=seed-data.js.map