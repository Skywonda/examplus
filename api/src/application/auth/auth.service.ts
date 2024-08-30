import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { HashingService } from 'src/infrastructure/service/hashing.service';
import { CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private _db: DatabaseService,
    private jwtService: JwtService,
    private hashingService: HashingService,
  ) {}

  async authenticate(
    email: string,
    password: string,
    type: UserType = 'STUDENT',
  ): Promise<any> {
    const user = await this._db.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await this.hashingService.verify(
      user.password,
      password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user.type !== type) {
      throw new UnauthorizedException('Invalid user type');
    }

    const token = await this.generateToken(user);
    const { password: _password, ...result } = user;
    return { ...result, token };
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, type: user.type };
    return this.jwtService.sign(payload);
  }

  async register(payload: CreateUserDto) {
    const existingUser = await this._db.user.findUnique({
      where: { email: payload.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.hashingService.hash(payload.password);

    const newUser = await this._db.user.create({
      data: { ...payload, password: hashedPassword },
    });

    const token = await this.generateToken(newUser);
    const { password: _password, ...result } = newUser;
    return { ...result, token };
  }

  // async changePassword(
  //   userId: string,
  //   oldPassword: string,
  //   newPassword: string,
  // ) {
  //   const user = await this.userService.findById(userId);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   const isOldPasswordValid = await this.hashingService.verify(
  //     user.password,
  //     oldPassword,
  //   );
  //   if (!isOldPasswordValid) {
  //     throw new UnauthorizedException('Invalid old password');
  //   }

  //   const hashedNewPassword = await this.hashingService.hash(newPassword);
  //   await this.userService.updatePassword(userId, hashedNewPassword);

  //   return { message: 'Password changed successfully' };
  // }
}
