import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { ConfigMangerService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
  ],
  providers: [ConfigMangerService],
  exports: [ConfigMangerService],
})
export class ConfigMangerModule {}
