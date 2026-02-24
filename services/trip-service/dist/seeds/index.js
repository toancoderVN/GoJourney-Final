"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("../config/database.config");
const config_1 = require("@nestjs/config");
async function seedDatabase() {
    const configService = new config_1.ConfigService();
    const dataSource = (0, database_config_1.createDatabaseConfig)(configService);
    try {
        await dataSource.initialize();
        console.log('🔗 Database connected');
        // Simple SQL insert statements for real data
        console.log('🌱 Seeding database with real data...');
        // Insert real users
        await dataSource.query(`
      INSERT INTO users (id, email, "passwordHash", "firstName", "lastName", "isActive", "emailVerified", preferences, "createdAt", "updatedAt")
      VALUES 
        ('550e8400-e29b-41d4-a716-446655440001', 'admin@travelagent.com', '$2b$10$YourHashedPasswordHere', 'Admin', 'User', true, true, '{"budgetRange": {"min": 0, "max": 50000000, "currency": "VND"}, "travelStyle": ["luxury", "comfort"], "hotelClass": "luxury", "language": "vi", "currency": "VND", "timezone": "Asia/Ho_Chi_Minh"}', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440002', 'nguyen.van.a@email.com', '$2b$10$YourHashedPasswordHere', 'Nguyễn Văn', 'A', true, true, '{"budgetRange": {"min": 5000000, "max": 20000000, "currency": "VND"}, "travelStyle": ["comfort", "adventure"], "hotelClass": "mid_range", "language": "vi", "currency": "VND", "timezone": "Asia/Ho_Chi_Minh"}', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440003', 'tran.thi.b@email.com', '$2b$10$YourHashedPasswordHere', 'Trần Thị', 'B', true, true, '{"budgetRange": {"min": 10000000, "max": 30000000, "currency": "VND"}, "travelStyle": ["luxury"], "hotelClass": "luxury", "language": "vi", "currency": "VND", "timezone": "Asia/Ho_Chi_Minh"}', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440004', 'le.van.c@email.com', '$2b$10$YourHashedPasswordHere', 'Lê Văn', 'C', true, false, '{"budgetRange": {"min": 3000000, "max": 15000000, "currency": "VND"}, "travelStyle": ["budget", "adventure"], "hotelClass": "budget", "language": "vi", "currency": "VND", "timezone": "Asia/Ho_Chi_Minh"}', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440005', 'pham.thi.d@email.com', '$2b$10$YourHashedPasswordHere', 'Phạm Thị', 'D', true, true, '{"budgetRange": {"min": 8000000, "max": 25000000, "currency": "VND"}, "travelStyle": ["comfort"], "hotelClass": "mid_range", "language": "vi", "currency": "VND", "timezone": "Asia/Ho_Chi_Minh"}', NOW(), NOW())
      ON CONFLICT (email) DO NOTHING;
    `);
        console.log('✅ Inserted users');
        // Insert providers
        await dataSource.query(`
      INSERT INTO providers (id, name, type, code, "isActive", config, "createdAt", "updatedAt")
      VALUES 
        ('660e8400-e29b-41d4-a716-446655440001', 'Vietnam Airlines', 'flight', 'VN', true, '{"baseUrl": "https://api.vietnamairlines.com", "apiKey": "mock-api-key", "timeout": 30000}', NOW(), NOW()),
        ('660e8400-e29b-41d4-a716-446655440002', 'VietJet Air', 'flight', 'VJ', true, '{"baseUrl": "https://api.vietjetair.com", "apiKey": "mock-api-key", "timeout": 30000}', NOW(), NOW()),
        ('660e8400-e29b-41d4-a716-446655440003', 'Vinpearl Hotels', 'hotel', 'VP', true, '{"baseUrl": "https://api.vinpearl.com", "apiKey": "mock-api-key", "timeout": 30000}', NOW(), NOW()),
        ('660e8400-e29b-41d4-a716-446655440004', 'Agoda', 'hotel', 'AG', true, '{"baseUrl": "https://api.agoda.com", "apiKey": "mock-api-key", "timeout": 30000}', NOW(), NOW()),
        ('660e8400-e29b-41d4-a716-446655440005', 'Klook', 'activity', 'KL', true, '{"baseUrl": "https://api.klook.com", "apiKey": "mock-api-key", "timeout": 30000}', NOW(), NOW())
      ON CONFLICT (code) DO NOTHING;
    `);
        console.log('✅ Inserted providers');
        // Insert real trips
        await dataSource.query(`
      INSERT INTO trips (id, "userId", name, destination, "startDate", "endDate", budget, currency, status, "isPrivate", preferences, description, "createdAt", "updatedAt")
      VALUES 
        ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Khám phá Kyoto - Osaka mùa hoa anh đào', 'Kyoto, Osaka, Japan', '2024-04-10', '2024-04-17', 45000000, 'VND', 'confirmed', false, '{"travelStyle": "comfort", "budgetLevel": "premium", "groupSize": 2, "interests": ["Cultural Sites", "Food & Dining", "Photography", "Traditional Arts"]}', 'Hành trình khám phá vẻ đẹp truyền thống Nhật Bản qua các ngôi chùa cổ kính, khu phố geisha và ẩm thực đặc sắc trong mùa hoa anh đào.', NOW(), NOW()),
        ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Phiêu lưu Bali - Indonesia', 'Bali, Indonesia', '2024-05-20', '2024-05-27', 25000000, 'VND', 'pending_booking', false, '{"travelStyle": "adventure", "budgetLevel": "comfort", "groupSize": 4, "interests": ["Beaches", "Adventure Sports", "Local Culture", "Temples"]}', 'Trải nghiệm thiên đường nhiệt đới với những bãi biển tuyệt đẹp, văn hóa Hindu độc đáo và các hoạt động mạo hiểm thú vị.', NOW(), NOW()),
        ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Singapore - Malaysia 7 ngày', 'Singapore & Kuala Lumpur', '2024-06-15', '2024-06-22', 35000000, 'VND', 'confirmed', false, '{"travelStyle": "comfort", "budgetLevel": "standard", "groupSize": 3, "interests": ["City Tours", "Shopping", "Food & Dining", "Modern Architecture"]}', 'Khám phá hai thành phố hiện đại Đông Nam Á với ẩm thực đa dạng, shopping mall cao cấp và các địa danh nổi tiếng.', NOW(), NOW()),
        ('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'Maldives - Kỳ nghỉ trăng mật', 'Maldives', '2024-07-10', '2024-07-17', 80000000, 'VND', 'draft', true, '{"travelStyle": "luxury", "budgetLevel": "luxury", "groupSize": 2, "interests": ["Beaches", "Water Sports", "Spa & Wellness", "Romance"]}', 'Kỳ nghỉ trăng mật lãng mạn tại thiên đường nhiệt đới với resort 5 sao, villa trên nước và các trải nghiệm độc quyền.', NOW(), NOW()),
        ('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Trekking Sapa - Fansipan', 'Sapa, Lào Cai, Vietnam', '2024-08-05', '2024-08-09', 12000000, 'VND', 'pending_booking', false, '{"travelStyle": "adventure", "budgetLevel": "budget", "groupSize": 6, "interests": ["Trekking", "Local Culture", "Photography", "Nature"]}', 'Chinh phục đỉnh Fansipan - nóc nhà Đông Dương và khám phá văn hóa độc đáo của các dân tộc thiểu số.', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('✅ Inserted trips');
        // Insert itineraries
        await dataSource.query(`
      INSERT INTO itineraries (id, "tripId", name, description, "createdAt", "updatedAt")
      VALUES 
        ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Lịch trình Kyoto - Osaka 7 ngày', 'Chi tiết các hoạt động từng ngày tại Nhật Bản', NOW(), NOW()),
        ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'Khám phá Bali 7 ngày', 'Từ Ubud đến các bãi biển tuyệt đẹp', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('✅ Inserted itineraries');
        // Insert itinerary items
        await dataSource.query(`
      INSERT INTO itinerary_items (id, "itineraryId", day, date, name, description, type, time, "estimatedCost", "createdAt", "updatedAt")
      VALUES 
        ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 1, '2024-04-10', 'Bay từ Hà Nội đến Kansai', 'Chuyến bay Vietnam Airlines VN321', 'flight', '14:30', 8000000, NOW(), NOW()),
        ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 1, '2024-04-10', 'Nhận phòng hotel Kyoto', 'Hotel Granvia Kyoto gần ga JR', 'accommodation', '19:00', 3500000, NOW(), NOW()),
        ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', 2, '2024-04-11', 'Thăm đền Fushimi Inari', 'Hàng nghìn cổng Torii đỏ nổi tiếng', 'activity', '09:00', 0, NOW(), NOW()),
        ('990e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440001', 2, '2024-04-11', 'Khu phố Gion', 'Tìm hiểu văn hóa Geisha', 'activity', '15:00', 500000, NOW(), NOW()),
        ('990e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440001', 3, '2024-04-12', 'Đền Kinkaku-ji (Chùa Vàng)', 'Ngôi chùa phủ vàng nổi tiếng', 'activity', '10:00', 400000, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('✅ Inserted itinerary items');
        // Insert bookings
        await dataSource.query(`
      INSERT INTO bookings (id, "tripId", "providerId", type, reference, status, details, "totalAmount", currency, "confirmedAt", metadata, "createdAt", "updatedAt")
      VALUES 
        ('aa0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'flight', 'VN321-240410', 'confirmed', '{"departure": "HAN", "arrival": "KIX", "departureTime": "2024-04-10T14:30:00Z", "arrivalTime": "2024-04-10T20:30:00Z", "flightNumber": "VN321", "passengers": 2, "class": "Economy"}', 16000000, 'VND', NOW(), '{"seats": ["12A", "12B"], "meal": "Standard", "baggage": "23kg"}', NOW(), NOW()),
        ('aa0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 'hotel', 'VP-KYT-240410', 'confirmed', '{"hotelName": "Hotel Granvia Kyoto", "roomType": "Superior Twin Room", "checkIn": "2024-04-10T15:00:00Z", "checkOut": "2024-04-17T11:00:00Z", "nights": 7, "guests": 2}', 24500000, 'VND', NOW(), '{"roomNumber": "1205", "amenities": ["WiFi", "Breakfast", "City View"], "cancellationPolicy": "Free cancellation until 24h before check-in"}', NOW(), NOW()),
        ('aa0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 'flight', 'VJ803-240615', 'pending', '{"departure": "SGN", "arrival": "SIN", "departureTime": "2024-06-15T08:15:00Z", "arrivalTime": "2024-06-15T11:30:00Z", "flightNumber": "VJ803", "passengers": 3, "class": "Economy"}', 9000000, 'VND', NULL, '{}', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log('✅ Inserted bookings');
        console.log('🎉 Database seeded successfully with real data!');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
// Run if called directly
if (require.main === module) {
    seedDatabase();
}
exports.default = seedDatabase;
//# sourceMappingURL=index.js.map