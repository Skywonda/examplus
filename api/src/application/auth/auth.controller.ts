import { Response } from 'express';
import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { LoginGuard } from 'src/infrastructure/auth/guards/login.guard';
import { CurrentUser } from 'src/infrastructure/decorator/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @UseGuards(LoginGuard)
  async checkAuth(@CurrentUser() user) {
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto, @Res() res: Response) {
    const { token } = await this.authService.authenticate(
      loginDto.email,
      loginDto.password,
      loginDto.type,
    );

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ token });
  }

  @Post('register')
  async register(
    @Body()
    payload: CreateUserDto,
    @Res() res: Response,
  ) {
    const { token, ...user } = await this.authService.register(payload);

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ token, user });
  }
}
