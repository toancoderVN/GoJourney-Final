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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_profile_service_1 = require("../services/user-profile.service");
const user_dto_1 = require("../dto/user.dto");
let UserProfileController = class UserProfileController {
    userProfileService;
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
    }
    async create(createUserProfileDto) {
        return this.userProfileService.create(createUserProfileDto);
    }
    async findAll() {
        return this.userProfileService.findAll();
    }
    async findOne(id) {
        return this.userProfileService.findOne(id);
    }
    async findByEmail(email) {
        const user = await this.userProfileService.findByEmail(email);
        if (!user) {
            return { message: 'User not found' };
        }
        return user;
    }
    async update(id, updateUserProfileDto) {
        return this.userProfileService.update(id, updateUserProfileDto);
    }
    async remove(id) {
        await this.userProfileService.remove(id);
        return { message: 'User profile deleted successfully' };
    }
    // Travel Preferences endpoints
    async createTravelPreferences(id, createTravelPreferenceDto) {
        createTravelPreferenceDto.userProfileId = id;
        return this.userProfileService.createTravelPreference(createTravelPreferenceDto);
    }
    async getTravelPreferences(id) {
        return this.userProfileService.getTravelPreferences(id);
    }
    async getTravelHistory(id) {
        return this.userProfileService.getTravelHistory(id);
    }
};
exports.UserProfileController = UserProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create user profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User profile created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User profile already exists' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all user profiles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User profile not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile by email' }),
    (0, swagger_1.ApiParam)({ name: 'email', description: 'User email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User profile not found' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User profile not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete user profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User profile not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/preferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Create travel preferences for user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Travel preferences created' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.CreateTravelPreferenceDto]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "createTravelPreferences", null);
__decorate([
    (0, common_1.Get)(':id/preferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Get travel preferences for user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Travel preferences retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getTravelPreferences", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get travel history for user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Travel history retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getTravelHistory", null);
exports.UserProfileController = UserProfileController = __decorate([
    (0, swagger_1.ApiTags)('user-profiles'),
    (0, common_1.Controller)('api/v1/users'),
    __metadata("design:paramtypes", [user_profile_service_1.UserProfileService])
], UserProfileController);
//# sourceMappingURL=user-profile.controller.js.map