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
exports.TravelCompanionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const travel_companion_service_1 = require("../services/travel-companion.service");
const travel_companion_dto_1 = require("../dto/travel-companion.dto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_profile_entity_1 = require("../entities/user-profile.entity");
let TravelCompanionController = class TravelCompanionController {
    companionService;
    userRepository;
    constructor(companionService, userRepository) {
        this.companionService = companionService;
        this.userRepository = userRepository;
    }
    async getUserId(req) {
        const userIdFromHeader = req.headers['user-id'];
        let userId;
        if (userIdFromHeader) {
            console.log('🎯 Using user ID from header:', userIdFromHeader);
            userId = userIdFromHeader;
        }
        else if (req.user?.id) {
            console.log('🔐 Using user ID from JWT token:', req.user.id);
            userId = req.user.id;
        }
        else {
            console.error('❌ No user identification found in request');
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        return userId;
    }
    async getCompanions(req) {
        const userId = await this.getUserId(req);
        return await this.companionService.getUserCompanions(userId);
    }
    async getStats(req) {
        const userId = await this.getUserId(req);
        return await this.companionService.getCompanionStats(userId);
    }
    async createInvitation(createDto, req) {
        const userId = await this.getUserId(req);
        return await this.companionService.createInvitation(userId, createDto);
    }
    async connectByUserId(connectDto, req) {
        const userId = await this.getUserId(req);
        return await this.companionService.connectByUserId(userId, connectDto);
    }
    async getPendingInvitations(req) {
        const userId = await this.getUserId(req);
        return await this.companionService.getPendingInvitations(userId);
    }
    async getInvitationByCode(code) {
        return await this.companionService.getInvitationByCode(code);
    }
    async acceptInvitation(invitationId, acceptDto, req) {
        const userId = await this.getUserId(req);
        return await this.companionService.acceptInvitation(invitationId, userId, acceptDto);
    }
    async declineInvitation(invitationId, req) {
        const userId = await this.getUserId(req);
        await this.companionService.declineInvitation(invitationId, userId);
        return { message: 'Đã từ chối lời mời' };
    }
    async updateCompanion(companionId, updateDto, req) {
        const userId = await this.getUserId(req);
        return await this.companionService.updateCompanion(userId, companionId, updateDto);
    }
    async updateTravelPreferences(companionId, preferencesDto, req) {
        const userId = await this.getUserId(req);
        return await this.companionService.updateTravelPreferences(userId, companionId, preferencesDto);
    }
    async blockCompanion(companionId, req) {
        const userId = await this.getUserId(req);
        await this.companionService.blockCompanion(userId, companionId);
        return { message: 'Đã chặn người đồng hành' };
    }
    async unblockCompanion(companionId, req) {
        const userId = await this.getUserId(req);
        await this.companionService.unblockCompanion(userId, companionId);
        return { message: 'Đã bỏ chặn người đồng hành' };
    }
    async incrementTripCount(companionId, req) {
        const userId = await this.getUserId(req);
        await this.companionService.incrementTripCount(userId, companionId);
        return { message: 'Đã cập nhật số chuyến đi' };
    }
    async connectByCode(data, req) {
        const userId = await this.getUserId(req);
        return this.companionService.connectByUserCode(userId, data.userCode, data.relationship, data.message);
    }
    async generateInviteLink(data, req) {
        const userId = await this.getUserId(req);
        return this.companionService.generateInviteLink(userId, data.relationship, data.message, data.tripId);
    }
    async acceptInviteByCode(code, data, req) {
        const userId = await this.getUserId(req);
        return this.companionService.acceptInviteByCode(userId, code, data.relationship);
    }
    async inviteToTrip(data, req) {
        const userId = await this.getUserId(req);
        return this.companionService.inviteToTrip(userId, data.companionId, data.tripId, data.message);
    }
    async acceptTripInvitation(invitationId, req) {
        const userId = await this.getUserId(req);
        await this.companionService.acceptTripInvitation(invitationId, userId);
        return { message: 'Đã chấp nhận lời mời tham gia chuyến đi' };
    }
    async getMyCode(req) {
        const userId = await this.getUserId(req);
        const code = await this.companionService.getUserCode(userId);
        return { code };
    }
    async removeCompanion(req, companionId) {
        const userId = await this.getUserId(req);
        await this.companionService.removeCompanion(userId, companionId);
        return { message: 'Đã xóa người đồng hành thành công' };
    }
};
exports.TravelCompanionController = TravelCompanionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách người đồng hành' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "getCompanions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thống kê người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thống kê người đồng hành' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('invitations'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo lời mời kết bạn đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lời mời đã được tạo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [travel_companion_dto_1.CreateCompanionInvitationDto, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "createInvitation", null);
__decorate([
    (0, common_1.Post)('connect-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Kết nối qua User ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lời mời kết nối đã được gửi' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [travel_companion_dto_1.ConnectByUserIdDto, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "connectByUserId", null);
__decorate([
    (0, common_1.Get)('invitations'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách lời mời chờ xử lý' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách lời mời' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "getPendingInvitations", null);
__decorate([
    (0, common_1.Get)('invitations/code/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin lời mời qua mã' }),
    (0, swagger_1.ApiParam)({ name: 'code', description: 'Mã lời mời' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thông tin lời mời' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "getInvitationByCode", null);
__decorate([
    (0, common_1.Post)('invitations/:id/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'Chấp nhận lời mời' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID lời mời' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lời mời đã được chấp nhận' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, travel_companion_dto_1.AcceptInvitationDto, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "acceptInvitation", null);
__decorate([
    (0, common_1.Post)('invitations/:id/decline'),
    (0, swagger_1.ApiOperation)({ summary: 'Từ chối lời mời' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID lời mời' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lời mời đã bị từ chối' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "declineInvitation", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin người đồng hành' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thông tin đã được cập nhật' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, travel_companion_dto_1.UpdateCompanionDto, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "updateCompanion", null);
__decorate([
    (0, common_1.Put)(':id/travel-preferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật sở thích du lịch của người đồng hành' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sở thích du lịch đã được cập nhật' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, travel_companion_dto_1.UpdateTravelPreferencesDto, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "updateTravelPreferences", null);
__decorate([
    (0, common_1.Post)(':id/block'),
    (0, swagger_1.ApiOperation)({ summary: 'Chặn người đồng hành' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã chặn người đồng hành' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "blockCompanion", null);
__decorate([
    (0, common_1.Post)(':id/unblock'),
    (0, swagger_1.ApiOperation)({ summary: 'Bỏ chặn người đồng hành' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã bỏ chặn người đồng hành' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "unblockCompanion", null);
__decorate([
    (0, common_1.Post)(':id/increment-trips'),
    (0, swagger_1.ApiOperation)({ summary: 'Tăng số chuyến đi chung' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID người đồng hành' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã cập nhật số chuyến đi' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "incrementTripCount", null);
__decorate([
    (0, common_1.Post)('connect-by-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Kết nối bằng mã người dùng' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Đã gửi lời mời kết nối' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "connectByCode", null);
__decorate([
    (0, common_1.Post)('generate-invite-link'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo link mời' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Đã tạo link mời' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "generateInviteLink", null);
__decorate([
    (0, common_1.Post)('accept-invite/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Chấp nhận lời mời bằng mã' }),
    (0, swagger_1.ApiParam)({ name: 'code', description: 'Mã lời mời' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã chấp nhận lời mời' }),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "acceptInviteByCode", null);
__decorate([
    (0, common_1.Post)('invite-to-trip'),
    (0, swagger_1.ApiOperation)({ summary: 'Mời người đồng hành tham gia chuyến đi' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Đã gửi lời mời tham gia chuyến đi' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "inviteToTrip", null);
__decorate([
    (0, common_1.Put)('accept-trip-invitation/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Chấp nhận lời mời tham gia chuyến đi' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID lời mời' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã chấp nhận lời mời tham gia chuyến đi' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "acceptTripInvitation", null);
__decorate([
    (0, common_1.Get)('my-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy mã cá nhân của tôi' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mã cá nhân' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "getMyCode", null);
__decorate([
    (0, common_1.Delete)(':companionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa người đồng hành' }),
    (0, swagger_1.ApiParam)({ name: 'companionId', description: 'ID của mối quan hệ companion' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đã xóa người đồng hành thành công' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('companionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TravelCompanionController.prototype, "removeCompanion", null);
exports.TravelCompanionController = TravelCompanionController = __decorate([
    (0, swagger_1.ApiTags)('travel-companions'),
    (0, common_1.Controller)('travel-companions'),
    (0, swagger_1.ApiBearerAuth)()
    // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
    ,
    __param(1, (0, typeorm_2.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [travel_companion_service_1.TravelCompanionService,
        typeorm_1.Repository])
], TravelCompanionController);
//# sourceMappingURL=travel-companion.controller.js.map