"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageEntry = exports.ChatSessionEntry = exports.Provider = exports.Booking = exports.ItineraryItem = exports.Itinerary = exports.Trip = exports.User = void 0;
var user_entity_1 = require("./user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
var trip_entity_1 = require("./trip.entity");
Object.defineProperty(exports, "Trip", { enumerable: true, get: function () { return trip_entity_1.Trip; } });
var itinerary_entity_1 = require("./itinerary.entity");
Object.defineProperty(exports, "Itinerary", { enumerable: true, get: function () { return itinerary_entity_1.Itinerary; } });
var itinerary_item_entity_1 = require("./itinerary-item.entity");
Object.defineProperty(exports, "ItineraryItem", { enumerable: true, get: function () { return itinerary_item_entity_1.ItineraryItem; } });
var booking_entity_1 = require("./booking.entity");
Object.defineProperty(exports, "Booking", { enumerable: true, get: function () { return booking_entity_1.Booking; } });
var provider_entity_1 = require("./provider.entity");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return provider_entity_1.Provider; } });
__exportStar(require("./booking-conversation.entity"), exports);
var chat_session_entity_1 = require("./chat-session.entity");
Object.defineProperty(exports, "ChatSessionEntry", { enumerable: true, get: function () { return chat_session_entity_1.ChatSessionEntry; } });
var chat_message_entity_1 = require("./chat-message.entity");
Object.defineProperty(exports, "ChatMessageEntry", { enumerable: true, get: function () { return chat_message_entity_1.ChatMessageEntry; } });
//# sourceMappingURL=index.js.map