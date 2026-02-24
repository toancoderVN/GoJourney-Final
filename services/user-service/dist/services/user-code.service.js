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
exports.UserCodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_code_entity_1 = require("../entities/user-code.entity");
const user_profile_entity_1 = require("../entities/user-profile.entity");
let UserCodeService = class UserCodeService {
    userCodeRepository;
    userProfileRepository;
    constructor(userCodeRepository, userProfileRepository) {
        this.userCodeRepository = userCodeRepository;
        this.userProfileRepository = userProfileRepository;
    }
    async generateUserCode(userId) {
        // Deactivate existing codes
        await this.userCodeRepository.update({ userId, isActive: true }, { isActive: false });
        // Generate new unique code
        let code = this.generateRandomCode();
        let isUnique = false;
        while (!isUnique) {
            const existingCode = await this.userCodeRepository.findOne({
                where: { code, isActive: true }
            });
            if (!existingCode) {
                isUnique = true;
            }
            else {
                code = this.generateRandomCode();
            }
        }
        const userCode = this.userCodeRepository.create({
            userId,
            code,
            isActive: true
        });
        return await this.userCodeRepository.save(userCode);
    }
    async findUserByCode(code) {
        const userCode = await this.userCodeRepository.findOne({
            where: { code, isActive: true }
        });
        if (!userCode) {
            return null;
        }
        const userProfile = await this.userProfileRepository.findOne({
            where: { id: userCode.userId }
        });
        return userProfile;
    }
    async getUserCode(userId) {
        return await this.userCodeRepository.findOne({
            where: { userId, isActive: true }
        });
    }
    generateRandomCode() {
        const prefix = 'TRV';
        const numbers = Math.floor(100000 + Math.random() * 900000).toString();
        return `${prefix}${numbers}`;
    }
};
exports.UserCodeService = UserCodeService;
exports.UserCodeService = UserCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_code_entity_1.UserCode)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserCodeService);
//# sourceMappingURL=user-code.service.js.map