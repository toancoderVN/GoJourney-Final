"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingDto = exports.CreateBookingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../types");
class CreateBookingDto {
    tripId;
    type;
    providerName;
    providerReference;
    serviceName;
    amount;
    currency;
    bookingDetails;
    confirmationData;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trip ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "tripId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Booking type', enum: types_1.BookingType }),
    (0, class_validator_1.IsEnum)(types_1.BookingType),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Provider name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Booking reference from provider' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "providerReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Service name/description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "serviceName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Booking amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Currency code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Booking details (JSON)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateBookingDto.prototype, "bookingDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Confirmation data (JSON)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateBookingDto.prototype, "confirmationData", void 0);
class UpdateBookingDto {
    status;
    serviceName;
    amount;
    currency;
    bookingDetails;
    confirmationData;
}
exports.UpdateBookingDto = UpdateBookingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Booking status', enum: types_1.BookingStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.BookingStatus),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Service name/description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "serviceName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Booking amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBookingDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Currency code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Booking details (JSON)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateBookingDto.prototype, "bookingDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Confirmation data (JSON)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateBookingDto.prototype, "confirmationData", void 0);
//# sourceMappingURL=booking.dto.js.map