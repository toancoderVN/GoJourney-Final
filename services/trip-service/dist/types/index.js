"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderType = exports.AccessibilityNeeds = exports.HotelClass = exports.TravelStyle = exports.ItineraryItemType = exports.BookingStatus = exports.BookingType = exports.TripStatus = void 0;
// Trip related enums and types
var TripStatus;
(function (TripStatus) {
    TripStatus["DRAFT"] = "draft";
    TripStatus["PENDING_BOOKING"] = "pending_booking";
    TripStatus["CONFIRMED"] = "confirmed";
    TripStatus["CANCELLED"] = "cancelled";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
// Booking related enums
var BookingType;
(function (BookingType) {
    BookingType["FLIGHT"] = "flight";
    BookingType["HOTEL"] = "hotel";
    BookingType["ACTIVITY"] = "activity";
    BookingType["RESTAURANT"] = "restaurant";
    BookingType["TRANSPORTATION"] = "transportation";
})(BookingType || (exports.BookingType = BookingType = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["FAILED"] = "failed";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
// Itinerary related enums
var ItineraryItemType;
(function (ItineraryItemType) {
    ItineraryItemType["FLIGHT"] = "flight";
    ItineraryItemType["ACCOMMODATION"] = "accommodation";
    ItineraryItemType["ACTIVITY"] = "activity";
    ItineraryItemType["RESTAURANT"] = "restaurant";
    ItineraryItemType["TRANSPORT"] = "transport";
    ItineraryItemType["ATTRACTION"] = "attraction";
    ItineraryItemType["EVENT"] = "event";
})(ItineraryItemType || (exports.ItineraryItemType = ItineraryItemType = {}));
// User related enums
var TravelStyle;
(function (TravelStyle) {
    TravelStyle["BUDGET"] = "budget";
    TravelStyle["COMFORT"] = "comfort";
    TravelStyle["LUXURY"] = "luxury";
    TravelStyle["ADVENTURE"] = "adventure";
    TravelStyle["FAMILY"] = "family";
    TravelStyle["BUSINESS"] = "business";
})(TravelStyle || (exports.TravelStyle = TravelStyle = {}));
var HotelClass;
(function (HotelClass) {
    HotelClass["HOSTEL"] = "hostel";
    HotelClass["BUDGET"] = "budget";
    HotelClass["MID_RANGE"] = "mid_range";
    HotelClass["UPSCALE"] = "upscale";
    HotelClass["LUXURY"] = "luxury";
})(HotelClass || (exports.HotelClass = HotelClass = {}));
var AccessibilityNeeds;
(function (AccessibilityNeeds) {
    AccessibilityNeeds["WHEELCHAIR"] = "wheelchair";
    AccessibilityNeeds["VISUAL_IMPAIRMENT"] = "visual_impairment";
    AccessibilityNeeds["HEARING_IMPAIRMENT"] = "hearing_impairment";
    AccessibilityNeeds["MOBILITY_ASSISTANCE"] = "mobility_assistance";
    AccessibilityNeeds["NONE"] = "none";
})(AccessibilityNeeds || (exports.AccessibilityNeeds = AccessibilityNeeds = {}));
// Provider related enums
var ProviderType;
(function (ProviderType) {
    ProviderType["FLIGHT"] = "flight";
    ProviderType["HOTEL"] = "hotel";
    ProviderType["CAR_RENTAL"] = "car_rental";
    ProviderType["ACTIVITY"] = "activity";
    ProviderType["RESTAURANT"] = "restaurant";
    ProviderType["TRANSFER"] = "transfer";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
//# sourceMappingURL=index.js.map