import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/infrastructure/decorator/role.decorator';
import { UserType } from '@prisma/client';
import { LoginGuard } from 'src/infrastructure/auth/guards/login.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/role.guard';
import { CurrentUser } from 'src/infrastructure/decorator/current-user.decorator';
import { ExamService } from '../exam/exam.service';

@Controller('user')
@UseGuards(LoginGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly examService: ExamService,
  ) {}

  @Get('student-dashboard')
  @Roles(UserType.STUDENT)
  studentDashboard(@CurrentUser() { id }) {
    return this.userService.studentDashboard(id);
  }

  @Get('exam-results')
  @Roles(UserType.STUDENT)
  getExamResults(@CurrentUser() { id }) {
    return this.userService.getSemesterExamResults(id);
  }
  @Get('cgpa')
  @Roles(UserType.STUDENT)
  async getStudentCGPA(
    @CurrentUser() user,
  ): Promise<{ TNU: number; TCP: number; CGPA: number }> {
    return await this.examService.calculateStudentCGPA(user.id);
  }
}
