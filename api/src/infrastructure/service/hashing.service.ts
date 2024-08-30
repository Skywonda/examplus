import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  async hash(data: string): Promise<string> {
    return argon2.hash(data, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
  }

  async verify(hashedData: string, plainData: string): Promise<boolean> {
    return argon2.verify(hashedData, plainData);
  }
}
