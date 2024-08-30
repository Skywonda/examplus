import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export interface IRequestUser {
  user: {
    id: string;
  };
}

@Injectable()
export class LoginGuard extends AuthGuard('login') {}
