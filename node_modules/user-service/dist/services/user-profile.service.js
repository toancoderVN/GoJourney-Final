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
exports.UserProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_profile_entity_1 = require("../entities/user-profile.entity");
const travel_preference_entity_1 = require("../entities/travel-preference.entity");
const travel_history_entity_1 = require("../entities/travel-history.entity");
let UserProfileService = class UserProfileService {
    userProfileRepository;
    travelPreferenceRepository;
    travelHistoryRepository;
    constructor(userProfileRepository, travelPreferenceRepository, travelHistoryRepository) {
        this.userProfileRepository = userProfileRepository;
        this.travelPreferenceRepository = travelPreferenceRepository;
        this.travelHistoryRepository = travelHistoryRepository;
    }
    async create(createUserProfileDto) {
        // Check if user already exists
        const existingUser = await this.userProfileRepository.findOne({
            where: { email: createUserProfileDto.email }
        });
        if (existingUser) {
            throw new common_1.ConflictException('User profile already exists');
        }
        const userProfile = this.userProfileRepository.create(createUserProfileDto);
        return this.userProfileRepository.save(userProfile);
    }
    async findAll() {
        return this.userProfileRepository.find({
            relations: ['travelPreferences'],
            where: { isActive: true }
        });
    }
    async findOne(id) {
        const userProfile = await this.userProfileRepository.findOne({
            where: { id, isActive: true },
            relations: ['travelPreferences']
        });
        if (!userProfile) {
            throw new common_1.NotFoundException('User profile not found');
        }
        return userProfile;
    }
    async findByEmail(email) {
        return this.userProfileRepository.findOne({
            where: { email, isActive: true },
            relations: ['travelPreferences']
        });
    }
    async update(id, updateUserProfileDto) {
        const userProfile = await this.findOne(id);
        Object.assign(userProfile, updateUserProfileDto);
        return this.userProfileRepository.save(userProfile);
    }
    async remove(id) {
        const userProfile = await this.findOne(id);
        userProfile.isActive = false;
        await this.userProfileRepository.save(userProfile);
    }
    // Travel Preferences
    async createTravelPreference(createTravelPreferenceDto) {
        // Verify user exists
        await this.findOne(createTravelPreferenceDto.userProfileId);
        const travelPreference = this.travelPreferenceRepository.create(createTravelPreferenceDto);
        return this.travelPreferenceRepository.save(travelPreference);
    }
    async getTravelPreferences(userProfileId) {
        await this.findOne(userProfileId); // Verify user exists
        return this.travelPreferenceRepository.find({
            where: { userProfileId }
        });
    }
    async updateTravelPreference(id, updateData) {
        const preference = await this.travelPreferenceRepository.findOne({ where: { id } });
        if (!preference) {
            throw new common_1.NotFoundException('Travel preference not found');
        }
        Object.assign(preference, updateData);
        return this.travelPreferenceRepository.save(preference);
    }
    // Travel History
    async getTravelHistory(userProfileId) {
        await this.findOne(userProfileId); // Verify user exists
        return this.travelHistoryRepository.find({
            where: { userProfileId },
            order: { startDate: 'DESC' }
        });
    }
    async addTravelHistory(historyData) {
        const history = this.travelHistoryRepository.create(historyData);
        return this.travelHistoryRepository.save(history);
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(travel_preference_entity_1.TravelPreference)),
    __param(2, (0, typeorm_1.InjectRepository)(travel_history_entity_1.TravelHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserProfileService);
//# sourceMappingURL=user-profile.service.js.map