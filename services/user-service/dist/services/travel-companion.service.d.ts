import { Repository } from 'typeorm';
import { TravelCompanion, RelationshipType } from '../entities/travel-companion.entity';
import { CompanionInvitation } from '../entities/companion-invitation.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { CreateCompanionInvitationDto, AcceptInvitationDto, UpdateCompanionDto, ConnectByUserIdDto, UpdateTravelPreferencesDto } from '../dto/travel-companion.dto';
import { UserCodeService } from './user-code.service';
import { NotificationService } from './notification.service';
import { NotificationGateway } from '../websocket/notification.gateway';
export declare class TravelCompanionService {
    private companionRepository;
    private invitationRepository;
    private userRepository;
    private userCodeService;
    private notificationService;
    private notificationGateway;
    constructor(companionRepository: Repository<TravelCompanion>, invitationRepository: Repository<CompanionInvitation>, userRepository: Repository<UserProfile>, userCodeService: UserCodeService, notificationService: NotificationService, notificationGateway: NotificationGateway);
    getUserCompanions(userId: string): Promise<TravelCompanion[]>;
    getCompanionStats(userId: string): Promise<{
        totalCompanions: number;
        primaryTravelers: number;
        companions: number;
        connected: number;
        pending: number;
        totalTrips: number;
        avgCompatibility: number;
    }>;
    createInvitation(senderId: string, createDto: CreateCompanionInvitationDto): Promise<CompanionInvitation>;
    connectByUserId(userId: string, connectDto: ConnectByUserIdDto): Promise<CompanionInvitation>;
    acceptInvitation(invitationId: string, userId: string, acceptDto: AcceptInvitationDto): Promise<TravelCompanion>;
    declineInvitation(invitationId: string, userId: string): Promise<void>;
    getPendingInvitations(userId: string): Promise<CompanionInvitation[]>;
    updateCompanion(userId: string, companionId: string, updateDto: UpdateCompanionDto): Promise<TravelCompanion>;
    updateTravelPreferences(userId: string, companionId: string, preferencesDto: UpdateTravelPreferencesDto): Promise<TravelCompanion>;
    blockCompanion(userId: string, companionId: string): Promise<void>;
    unblockCompanion(userId: string, companionId: string): Promise<void>;
    getInvitationByCode(inviteCode: string): Promise<CompanionInvitation>;
    incrementTripCount(userId: string, companionId: string): Promise<void>;
    connectByUserCode(userId: string, userCode: string, relationship: RelationshipType, message?: string): Promise<CompanionInvitation>;
    generateInviteLink(userId: string, relationship: RelationshipType, message?: string, tripId?: string): Promise<{
        inviteCode: string;
        inviteLink: string;
    }>;
    acceptInviteByCode(userId: string, inviteCode: string, relationship: RelationshipType): Promise<TravelCompanion>;
    inviteToTrip(userId: string, companionId: string, tripId: string, message?: string): Promise<CompanionInvitation>;
    acceptTripInvitation(invitationId: string, userId: string): Promise<void>;
    private ensureUserProfile;
    getUserCode(userId: string): Promise<string>;
    removeCompanion(userId: string, companionId: string): Promise<void>;
    private generateInviteCode;
}
//# sourceMappingURL=travel-companion.service.d.ts.map