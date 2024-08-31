"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const role_decorator_1 = require("../../infrastructure/decorator/role.decorator");
const client_1 = require("@prisma/client");
const login_guard_1 = require("../../infrastructure/auth/guards/login.guard");
const role_guard_1 = require("../../infrastructure/auth/guards/role.guard");
const current_user_decorator_1 = require("../../infrastructure/decorator/current-user.decorator");
const exam_service_1 = require("../exam/exam.service");
let UserController = class UserController {
    constructor(userService, examService) {
        this.userService = userService;
        this.examService = examService;
    }
    studentDashboard({ id }) {
        return this.userService.studentDashboard(id);
    }
    getExamResults({ id }) {
        return this.userService.getSemesterExamResults(id);
    }
    async getStudentCGPA(user) {
        return await this.examService.calculateStudentCGPA(user.id);
    }
};
__decorate([
    (0, common_1.Get)('student-dashboard'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "studentDashboard", null);
__decorate([
    (0, common_1.Get)('exam-results'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getExamResults", null);
__decorate([
    (0, common_1.Get)('cgpa'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getStudentCGPA", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        exam_service_1.ExamService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map