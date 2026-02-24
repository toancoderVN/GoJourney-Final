import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").SimpleAuthResponse>;
    login(loginDto: LoginDto): Promise<import("./auth.service").SimpleAuthResponse>;
    getProfile(req: any): Promise<import("./auth.service").SimpleUser>;
    getUserById(userId: string, requestingUserId?: string): Promise<import("./auth.service").SimpleUser | {
        message: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
    refresh(body: {
        refreshToken?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map