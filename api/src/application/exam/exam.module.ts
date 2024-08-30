import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService, ExamService, DatabaseService],
})
export class ExamModule {}
