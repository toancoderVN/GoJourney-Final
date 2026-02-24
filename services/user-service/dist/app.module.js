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
const user_profile_controller_1 = require("./controllers/user-profile.controller");
const user_profile_service_1 = require("./services/user-profile.service");
const travel_companion_controller_1 = require("./controllers/travel-companion.controller");
const travel_companion_service_1 = require("./services/travel-companion.service");
const notification_controller_1 = require("./controllers/notification.controller");
const notification_service_1 = require("./services/notification.service");
const user_code_service_1 = require("./services/user-code.service");
const user_profile_entity_1 = require("./entities/user-profile.entity");
const travel_preference_entity_1 = require("./entities/travel-preference.entity");
const travel_history_entity_1 = require("./entities/travel-history.entity");
const travel_companion_entity_1 = require("./entities/travel-companion.entity");
const companion_invitation_entity_1 = require("./entities/companion-invitation.entity");
const user_code_entity_1 = require("./entities/user-code.entity");
const notification_entity_1 = require("./entities/notification.entity");
const notification_gateway_1 = require("./websocket/notification.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_DATABASE', 'travel_agent_dev'),
                    entities: [user_profile_entity_1.UserProfile, travel_preference_entity_1.TravelPreference, travel_history_entity_1.TravelHistory, travel_companion_entity_1.TravelCompanion, companion_invitation_entity_1.CompanionInvitation, user_code_entity_1.UserCode, notification_entity_1.Notification],
                    synchronize: true, // Temporarily enable to sync schema
                    logging: configService.get('DB_LOGGING', false),
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_profile_entity_1.UserProfile, travel_preference_entity_1.TravelPreference, travel_history_entity_1.TravelHistory, travel_companion_entity_1.TravelCompanion, companion_invitation_entity_1.CompanionInvitation, user_code_entity_1.UserCode, notification_entity_1.Notification]),
        ],
        controllers: [user_profile_controller_1.UserProfileController, travel_companion_controller_1.TravelCompanionController, notification_controller_1.NotificationController],
        providers: [user_profile_service_1.UserProfileService, travel_companion_service_1.TravelCompanionService, notification_service_1.NotificationService, user_code_service_1.UserCodeService, notification_gateway_1.NotificationGateway],
        exports: [user_profile_service_1.UserProfileService, travel_companion_service_1.TravelCompanionService, notification_service_1.NotificationService, user_code_service_1.UserCodeService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map