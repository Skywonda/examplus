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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const exam_dto_1 = require("./dto/exam.dto");
const client_1 = require("@prisma/client");
const login_guard_1 = require("../../infrastructure/auth/guards/login.guard");
const role_guard_1 = require("../../infrastructure/auth/guards/role.guard");
const role_decorator_1 = require("../../infrastructure/decorator/role.decorator");
const current_user_decorator_1 = require("../../infrastructure/decorator/current-user.decorator");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    createExam(examData, user) {
        return this.examService.createExam(examData, user.id);
    }
    listExams(user) {
        return this.examService.listExams(user.id, user.type);
    }
    async listStudentExams(user) {
        return await this.examService.listExamsForStudent(user.id);
    }
    getExam(id, user) {
        return this.examService.getExam(id, user.id);
    }
    startExam(id, user) {
        return this.examService.startExam(id, user.id);
    }
    submitExam(id, body) {
        return this.examService.submitExam(body.takenExamId, body.answers);
    }
    getExamResult(id, user) {
        return this.examService.getExamResult(id, user.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(client_1.UserType.LECTURER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.CreateExamDto, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "createExam", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "listExams", null);
__decorate([
    (0, common_1.Get)('student'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "listStudentExams", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "getExam", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "startExam", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "submitExam", null);
__decorate([
    (0, common_1.Get)(':id/result'),
    (0, role_decorator_1.Roles)(client_1.UserType.STUDENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "getExamResult", null);
ExamController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
exports.ExamController = ExamController;
//# sourceMappingURL=exam.controller.js.map