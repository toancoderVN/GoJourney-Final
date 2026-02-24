import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { TravelPreference } from '../entities/travel-preference.entity';
import { TravelHistory } from '../entities/travel-history.entity';
import { CreateUserProfileDto, UpdateUserProfileDto, CreateTravelPreferenceDto } from '../dto/user.dto';
export declare class UserProfileService {
    private userProfileRepository;
    private travelPreferenceRepository;
    private travelHistoryRepository;
    constructor(userProfileRepository: Repository<UserProfile>, travelPreferenceRepository: Repository<TravelPreference>, travelHistoryRepository: Repository<TravelHistory>);
    create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile>;
    findAll(): Promise<UserProfile[]>;
    findOne(id: string): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserProfile | null>;
    update(id: string, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile>;
    remove(id: string): Promise<void>;
    createTravelPreference(createTravelPreferenceDto: CreateTravelPreferenceDto): Promise<TravelPreference>;
    getTravelPreferences(userProfileId: string): Promise<TravelPreference[]>;
    updateTravelPreference(id: string, updateData: Partial<CreateTravelPreferenceDto>): Promise<TravelPreference>;
    getTravelHistory(userProfileId: string): Promise<TravelHistory[]>;
    addTravelHistory(historyData: Partial<TravelHistory>): Promise<TravelHistory>;
}
//# sourceMappingURL=user-profile.service.d.ts.map