import { JwtService } from '@nestjs/jwt';
import { User, UserType } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { HashingService } from 'src/infrastructure/service/hashing.service';
import { CreateUserDto } from './dto/auth.dto';
export declare class AuthService {
    private _db;
    private jwtService;
    private hashingService;
    constructor(_db: DatabaseService, jwtService: JwtService, hashingService: HashingService);
    authenticate(email: string, password: string, type?: UserType): Promise<any>;
    generateToken(user: User): Promise<string>;
    register(payload: CreateUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        name: string;
        matricNumber: string;
        lecturerId: string;
        type: import(".prisma/client").$Enums.UserType;
    }>;
}
