import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").SimpleAuthResponse>;
    login(loginDto: LoginDto): Promise<import("./auth.service").SimpleAuthResponse>;
    getProfile(): Promise<{
        message: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.controller.simple.d.ts.map