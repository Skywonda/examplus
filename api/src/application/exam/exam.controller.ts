import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto, SubmitAnswerDto } from './dto/exam.dto';
import { UserType } from '@prisma/client';
import { LoginGuard } from 'src/infrastructure/auth/guards/login.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/role.guard';
import { Roles } from 'src/infrastructure/decorator/role.decorator';
import { CurrentUser } from 'src/infrastructure/decorator/current-user.decorator';

@Controller('exams')
@UseGuards(LoginGuard, RolesGuard)
export class ExamController {
  constructor(private examService: ExamService) {}

  @Post()
  @Roles(UserType.LECTURER)
  createExam(@Body() examData: CreateExamDto, @CurrentUser() user) {
    return this.examService.createExam(examData, user.id);
  }

  @Get()
  listExams(@CurrentUser() user) {
    return this.examService.listExams(user.id, user.type);
  }

  @Get('student')
  @Roles(UserType.STUDENT)
  async listStudentExams(@CurrentUser() user) {
    return await this.examService.listExamsForStudent(user.id);
  }

  @Get(':id')
  getExam(@Param('id') id: string, @CurrentUser() user) {
    return this.examService.getExam(id, user.id);
  }

  @Post(':id/start')
  @Roles(UserType.STUDENT)
  startExam(@Param('id') id: string, @CurrentUser() user) {
    return this.examService.startExam(id, user.id);
  }

  @Post(':id/submit')
  @Roles(UserType.STUDENT)
  submitExam(
    @Param('id') id: string,
    @Body() body: { answers: SubmitAnswerDto[]; takenExamId: string },
  ) {
    return this.examService.submitExam(body.takenExamId, body.answers);
  }

  @Get(':id/result')
  @Roles(UserType.STUDENT)
  getExamResult(@Param('id') id: string, @CurrentUser() user) {
    return this.examService.getExamResult(id, user.id);
  }
}
