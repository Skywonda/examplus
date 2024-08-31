import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ExamService } from '../exam/exam.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService, ExamService],
})
export class UserModule {}
