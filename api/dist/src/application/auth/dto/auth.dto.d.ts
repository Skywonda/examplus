import { UserType } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
    matricNumber?: string;
    lecturerId?: string;
    type: UserType;
}
export declare class LoginUserDto {
    email: string;
    password: string;
    type: UserType;
}
