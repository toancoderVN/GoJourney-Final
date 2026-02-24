import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/auth.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(registerDto: RegisterDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
    findByFacebookId(facebookId: string): Promise<User | null>;
    validatePassword(user: User, password: string): Promise<boolean>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
    setPasswordResetToken(userId: string, token: string): Promise<void>;
    verifyEmail(userId: string): Promise<void>;
    linkGoogleAccount(userId: string, googleId: string): Promise<void>;
    linkFacebookAccount(userId: string, facebookId: string): Promise<void>;
}
//# sourceMappingURL=users.service.d.ts.map