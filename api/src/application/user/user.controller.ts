import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/infrastructure/decorator/role.decorator';
import { UserType } from '@prisma/client';
import { LoginGuard } from 'src/infrastructure/auth/guards/login.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/role.guard';
import { CurrentUser } from 'src/infrastructure/decorator/current-user.decorator';

@Controller('user')
@UseGuards(LoginGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
