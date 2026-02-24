import { UserProfileService } from '../services/user-profile.service';
import { CreateUserProfileDto, UpdateUserProfileDto, CreateTravelPreferenceDto } from '../dto/user.dto';
export declare class UserProfileController {
    private readonly userProfileService;
    constructor(userProfileService: UserProfileService);
    create(createUserProfileDto: CreateUserProfileDto): Promise<import("../entities/user-profile.entity").UserProfile>;
    findAll(): Promise<import("../entities/user-profile.entity").UserProfile[]>;
    findOne(id: string): Promise<import("../entities/user-profile.entity").UserProfile>;
    findByEmail(email: string): Promise<import("../entities/user-profile.entity").UserProfile | {
        message: string;
    }>;
    update(id: string, updateUserProfileDto: UpdateUserProfileDto): Promise<import("../entities/user-profile.entity").UserProfile>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createTravelPreferences(id: string, createTravelPreferenceDto: CreateTravelPreferenceDto): Promise<import("../entities/travel-preference.entity").TravelPreference>;
    getTravelPreferences(id: string): Promise<import("../entities/travel-preference.entity").TravelPreference[]>;
    getTravelHistory(id: string): Promise<import("../entities/travel-history.entity").TravelHistory[]>;
}
//# sourceMappingURL=user-profile.controller.d.ts.map