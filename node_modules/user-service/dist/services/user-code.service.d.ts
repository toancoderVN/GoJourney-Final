import { Repository } from 'typeorm';
import { UserCode } from '../entities/user-code.entity';
import { UserProfile } from '../entities/user-profile.entity';
export declare class UserCodeService {
    private userCodeRepository;
    private userProfileRepository;
    constructor(userCodeRepository: Repository<UserCode>, userProfileRepository: Repository<UserProfile>);
    generateUserCode(userId: string): Promise<UserCode>;
    findUserByCode(code: string): Promise<UserProfile | null>;
    getUserCode(userId: string): Promise<UserCode | null>;
    private generateRandomCode;
}
//# sourceMappingURL=user-code.service.d.ts.map