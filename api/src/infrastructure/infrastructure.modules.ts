import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { HashingService } from './service/hashing.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [HashingService],
})
export class InfrastructureModule {}
