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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const database_service_1 = require("../../infrastructure/database/database.service");
let ExamService = class ExamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createExam(data, creatorId) {
        const { questions, courseUnit } = data, examData = __rest(data, ["questions", "courseUnit"]);
        questions.map((each) => {
            if (!each.options.includes(each.answer))
                throw new common_1.BadRequestException('Answer not found in options');
        });
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1);
        return this.prisma.exam.create({
            data: Object.assign(Object.assign({}, examData), { dueDate, courseUnit: parseInt(courseUnit), creator: { connect: { id: creatorId } }, questions: {
                    create: questions.map((q) => ({
                        text: q.text,
                        options: q.options,
                        answer: q.answer,
                    })),
                } }),
            include: { questions: true },
        });
    }
    async getExam(examId, userId) {
        const exam = await this.prisma.exam.findUnique({
            where: { id: examId },
            include: {
                questions: true,
                creator: true,
                takenExams: {
                    where: { userId },
                    include: { result: true },
                },
            },
        });
        if (!exam) {
            throw new common_1.NotFoundException('Exam not found');
        }
        if (exam.creator.id !== userId) {
            exam.questions = exam.questions.map((q) => (Object.assign(Object.assign({}, q), { answer: undefined })));
        }
        return exam;
    }
    async listExamsForStudent(userId) {
        const exams = await this.prisma.exam.findMany({
            include: { creator: { select: { name: true } } },
        });
        const examsWithStatus = await Promise.all(exams.map(async (exam) => {
            let status = 'unavailable';
            const hasTakenExam = await this.prisma.takenExam.findFirst({
                where: { examId: exam.id, userId },
                select: { id: true, startedAt: true, endedAt: true },
            });
            if (hasTakenExam) {
                if (hasTakenExam.endedAt) {
                    status = 'completed';
                }
                else {
                    status = 'ongoing';
                }
            }
            else if (exam.dueDate && exam.dueDate > new Date()) {
                status = 'active';
            }
            return Object.assign(Object.assign({}, exam), { status });
        }));
        return examsWithStatus;
    }
    async listExams(userId, userType) {
        if (userType === client_1.UserType.LECTURER) {
            return this.prisma.exam.findMany({
                where: { creatorId: userId },
                include: { questions: true },
            });
        }
        else {
            return this.prisma.exam.findMany();
        }
    }
    async startExam(examId, userId) {
        const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
        if (!exam) {
            throw new common_1.NotFoundException('Exam not found');
        }
        const hasTakenExam = await this.prisma.takenExam.findFirst({
            where: { examId: exam.id, userId },
        });
        if (hasTakenExam) {
            return hasTakenExam;
        }
        return this.prisma.takenExam.create({
            data: {
                exam: { connect: { id: examId } },
                user: { connect: { id: userId } },
                startedAt: new Date(),
            },
        });
    }
    async submitExam(takenExamId, answers) {
        const takenExam = await this.prisma.takenExam.findUnique({
            where: { id: takenExamId },
            include: { exam: { include: { questions: true } } },
        });
        if (!takenExam) {
            throw new common_1.NotFoundException('Taken exam not found');
        }
        if (takenExam.endedAt) {
            throw new common_1.ForbiddenException('Exam has already been submitted');
        }
        const { score, correctAnswers } = this.calculateScore(takenExam.exam.questions, answers);
        const grade = this.calculateGrade(score);
        const totalQuestions = takenExam.exam.questions.length;
        const updatedTakenExam = await this.prisma.takenExam.update({
            where: { id: takenExamId },
            data: {
                endedAt: new Date(),
                result: {
                    create: { totalScore: score, correctAnswers, grade, totalQuestions },
                },
                answers: {
                    create: answers.map((a) => ({
                        questionId: a.questionId,
                        answer: a.answer,
                    })),
                },
            },
            include: { result: true },
        });
        return updatedTakenExam;
    }
    async getExamResult(takenExamId, userId) {
        const takenExam = await this.prisma.takenExam.findUnique({
            where: { id: takenExamId },
            include: {
                exam: { include: { questions: true } },
                answers: true,
                user: true,
            },
        });
        if (!takenExam) {
            throw new common_1.NotFoundException('Taken exam not found');
        }
        if (takenExam.user.id !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view this result');
        }
        return takenExam;
    }
    calculateScore(questions, answers) {
        let correctAnswers = 0;
        questions.forEach((question) => {
            const userAnswer = answers.find((a) => a.questionId === question.id);
            if (userAnswer && userAnswer.answer === question.answer) {
                correctAnswers++;
            }
        });
        return {
            correctAnswers,
            score: (correctAnswers / questions.length) * 100,
        };
    }
    calculateGrade(score) {
        if (score >= 70) {
            return 'A';
        }
        else if (score >= 60) {
            return 'B';
        }
        else if (score >= 50) {
            return 'C';
        }
        else if (score >= 40) {
            return 'D';
        }
        else {
            return 'F';
        }
    }
    async calculateStudentCGPA(studentId) {
        const takenExams = await this.prisma.takenExam.findMany({
            where: { userId: studentId },
            include: {
                result: true,
                exam: { select: { courseUnit: true } },
            },
        });
        if (takenExams.length === 0) {
            return { TNU: 0, TCP: 0, CGPA: 0 };
        }
        let totalGradePoints = 0;
        let totalCourseUnits = 0;
        for (const takenExam of takenExams) {
            if (!takenExam.result) {
                continue;
            }
            const gradePoint = this.gradeToGradePoint(takenExam.result.grade);
            totalGradePoints += gradePoint * takenExam.exam.courseUnit;
            totalCourseUnits += takenExam.exam.courseUnit;
        }
        const cgpa = parseFloat((totalGradePoints / totalCourseUnits).toFixed(2));
        return {
            TNU: totalCourseUnits,
            TCP: totalGradePoints,
            CGPA: cgpa,
        };
    }
    gradeToGradePoint(grade) {
        switch (grade) {
            case 'A':
                return 5;
            case 'B':
                return 4;
            case 'C':
                return 3;
            case 'D':
                return 2;
            case 'E':
                return 1;
            case 'F':
                return 0;
            default:
                return;
        }
    }
};
ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map