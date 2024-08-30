import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigMangerService } from './infrastructure/config/config.service';
import { LoginStrategy } from './infrastructure/auth/strategies/login.strategy';
import { PrismaModule } from './infrastructure/database/database.module';
import { AuthModule } from './application/auth/auth.module';
import { ConfigMangerModule } from './infrastructure/config/config.module';
import { InfrastructureModule } from './infrastructure/infrastructure.modules';
import { ExamModule } from './application/exam/exam.module';
import { UserModule } from './application/user/user.module';

@Module({
  exports: [ConfigMangerService],
  providers: [LoginStrategy, ConfigMangerService],
  imports: [
    PrismaModule,
    AuthModule,
    ExamModule,
    UserModule,
    PassportModule,
    ConfigMangerModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
