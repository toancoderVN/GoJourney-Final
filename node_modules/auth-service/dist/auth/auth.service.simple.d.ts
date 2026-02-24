import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export interface SimpleUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isEmailVerified: boolean;
    phone: string;
    dateOfBirth: Date;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            sms: boolean;
            push: boolean;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface SimpleTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export interface SimpleAuthResponse {
    user: SimpleUser;
    tokens: SimpleTokens;
}
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    register(registerDto: RegisterDto): Promise<SimpleAuthResponse>;
    login(loginDto: LoginDto): Promise<SimpleAuthResponse>;
    getProfile(userId: string): Promise<SimpleUser>;
    private transformUser;
    private generateSimpleTokens;
}
//# sourceMappingURL=auth.service.simple.d.ts.map