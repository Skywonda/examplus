import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    checkAuth(user: any): Promise<any>;
    login(loginDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(payload: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
