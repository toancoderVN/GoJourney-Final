import { TravelCompanionService } from '../services/travel-companion.service';
import { CreateCompanionInvitationDto, AcceptInvitationDto, UpdateCompanionDto, ConnectByUserIdDto, UpdateTravelPreferencesDto } from '../dto/travel-companion.dto';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
    };
}
export declare class TravelCompanionController {
    private readonly companionService;
    private readonly userRepository;
    constructor(companionService: TravelCompanionService, userRepository: Repository<UserProfile>);
    private getUserId;
    getCompanions(req: AuthenticatedRequest): Promise<import("../entities/travel-companion.entity").TravelCompanion[]>;
    getStats(req: AuthenticatedRequest): Promise<{
        totalCompanions: number;
        primaryTravelers: number;
        companions: number;
        connected: number;
        pending: number;
        totalTrips: number;
        avgCompatibility: number;
    }>;
    createInvitation(createDto: CreateCompanionInvitationDto, req: AuthenticatedRequest): Promise<import("../entities/companion-invitation.entity").CompanionInvitation>;
    connectByUserId(connectDto: ConnectByUserIdDto, req: AuthenticatedRequest): Promise<import("../entities/companion-invitation.entity").CompanionInvitation>;
    getPendingInvitations(req: AuthenticatedRequest): Promise<import("../entities/companion-invitation.entity").CompanionInvitation[]>;
    getInvitationByCode(code: string): Promise<import("../entities/companion-invitation.entity").CompanionInvitation>;
    acceptInvitation(invitationId: string, acceptDto: AcceptInvitationDto, req: AuthenticatedRequest): Promise<import("../entities/travel-companion.entity").TravelCompanion>;
    declineInvitation(invitationId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    updateCompanion(companionId: string, updateDto: UpdateCompanionDto, req: AuthenticatedRequest): Promise<import("../entities/travel-companion.entity").TravelCompanion>;
    updateTravelPreferences(companionId: string, preferencesDto: UpdateTravelPreferencesDto, req: AuthenticatedRequest): Promise<import("../entities/travel-companion.entity").TravelCompanion>;
    blockCompanion(companionId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    unblockCompanion(companionId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    incrementTripCount(companionId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    connectByCode(data: {
        userCode: string;
        relationship: string;
        message?: string;
    }, req: AuthenticatedRequest): Promise<import("../entities/companion-invitation.entity").CompanionInvitation>;
    generateInviteLink(data: {
        relationship: string;
        message?: string;
        tripId?: string;
    }, req: AuthenticatedRequest): Promise<{
        inviteCode: string;
        inviteLink: string;
    }>;
    acceptInviteByCode(code: string, data: {
        relationship: string;
    }, req: AuthenticatedRequest): Promise<import("../entities/travel-companion.entity").TravelCompanion>;
    inviteToTrip(data: {
        companionId: string;
        tripId: string;
        message?: string;
    }, req: AuthenticatedRequest): Promise<import("../entities/companion-invitation.entity").CompanionInvitation>;
    acceptTripInvitation(invitationId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getMyCode(req: AuthenticatedRequest): Promise<{
        code: string;
    }>;
    removeCompanion(req: AuthenticatedRequest, companionId: string): Promise<{
        message: string;
    }>;
}
export {};
//# sourceMappingURL=travel-companion.controller.d.ts.map