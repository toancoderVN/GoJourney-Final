"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const trip_controller_1 = require("./controllers/trip.controller");
const trip_service_1 = require("./services/trip.service");
const trip_entity_1 = require("./entities/trip.entity");
const itinerary_entity_1 = require("./entities/itinerary.entity");
const itinerary_item_entity_1 = require("./entities/itinerary-item.entity");
const booking_entity_1 = require("./entities/booking.entity");
const provider_entity_1 = require("./entities/provider.entity");
const user_entity_1 = require("./entities/user.entity");
const travel_companion_entity_1 = require("./entities/travel-companion.entity");
const trip_note_entity_1 = require("./entities/trip-note.entity");
const analytics_module_1 = require("./analytics/analytics.module");
const chat_controller_1 = require("./controllers/chat.controller");
const chat_service_1 = require("./services/chat.service");
const chat_session_entity_1 = require("./entities/chat-session.entity");
const chat_message_entity_1 = require("./entities/chat-message.entity");
const booking_conversation_entity_1 = require("./entities/booking-conversation.entity");
// import { ZaloWebhookController } from './controllers/zalo-webhook.controller';
// import { ZaloBookingService } from './services/zalo-booking.service'; // TODO: Refactor to new schema
const booking_conversation_controller_1 = require("./controllers/booking-conversation.controller");
const agent_booking_controller_1 = require("./controllers/agent-booking.controller");
const agent_booking_service_1 = require("./services/agent-booking.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: parseInt(configService.get('DB_PORT') || '5432'),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_DATABASE', 'travel_agent_dev'),
                    entities: [trip_entity_1.Trip, itinerary_entity_1.Itinerary, itinerary_item_entity_1.ItineraryItem, booking_entity_1.Booking, provider_entity_1.Provider, user_entity_1.User, travel_companion_entity_1.TravelCompanion, chat_session_entity_1.ChatSessionEntry, chat_message_entity_1.ChatMessageEntry, booking_conversation_entity_1.BookingConversation, trip_note_entity_1.TripNote],
                    synchronize: true, // Only for development
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([trip_entity_1.Trip, itinerary_entity_1.Itinerary, itinerary_item_entity_1.ItineraryItem, booking_entity_1.Booking, provider_entity_1.Provider, user_entity_1.User, travel_companion_entity_1.TravelCompanion, chat_session_entity_1.ChatSessionEntry, chat_message_entity_1.ChatMessageEntry, booking_conversation_entity_1.BookingConversation, trip_note_entity_1.TripNote]),
            analytics_module_1.AnalyticsModule,
        ],
        controllers: [trip_controller_1.TripController, chat_controller_1.ChatController, /* ZaloWebhookController, */ booking_conversation_controller_1.BookingConversationController, agent_booking_controller_1.AgentBookingController],
        providers: [trip_service_1.TripService, chat_service_1.ChatService, /* ZaloBookingService, */ agent_booking_service_1.AgentBookingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map