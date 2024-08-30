import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigMangerService } from 'src/infrastructure/config/config.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(config: ConfigMangerService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([LoginStrategy.extractJwt]),
      secretOrKey: config.get('LOGIN_JWT_SECRET'),
    });
  }

  private static extractJwt(req: Request) {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }

    if (req.headers && 'authorization' in req.headers) {
      const [type, token] = req.headers.authorization.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }

    return null;
  }

  validate<T>(payload: T) {
    return payload;
  }
}
