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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../infrastructure/database/database.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async studentDashboard(studentId) {
        const [examHistoryData, activeExams, pastExams] = await Promise.all([
            this.prisma.takenExam.findMany({
                where: {
                    userId: studentId,
                    endedAt: {
                        not: null,
                    },
                },
                select: {
                    exam: {
                        select: {
                            title: true,
                        },
                    },
                    result: {
                        select: {
                            totalScore: true,
                        },
                    },
                },
                orderBy: {
                    endedAt: 'desc',
                },
            }),
            this.prisma.exam.findMany({
                where: {
                    takenExams: {
                        none: {
                            userId: studentId,
                        },
                    },
                    dueDate: {
                        gte: new Date(),
                    },
                },
                select: {
                    id: true,
                    title: true,
                    courseCode: true,
                    dueDate: true,
                },
            }),
            this.prisma.takenExam.findMany({
                where: {
                    userId: studentId,
                    endedAt: {
                        not: null,
                    },
                },
                select: {
                    exam: {
                        select: {
                            id: true,
                            title: true,
                            courseCode: true,
                        },
                    },
                    result: {
                        select: {
                            totalScore: true,
                        },
                    },
                },
            }),
        ]);
        const totalScore = pastExams.reduce((sum, exam) => { var _a; return sum + (((_a = exam.result) === null || _a === void 0 ? void 0 : _a.totalScore) || 0); }, 0);
        const overallPerformance = parseFloat(((totalScore / (pastExams.length * 100)) * 100).toFixed(2)) ||
            0;
        const examHistory = examHistoryData.map((takenExam) => {
            var _a;
            return {
                title: takenExam.exam.title,
                score: ((_a = takenExam.result) === null || _a === void 0 ? void 0 : _a.totalScore) || 0,
            };
        });
        const pastExamHistory = pastExams.map((takenExam) => {
            var _a;
            return {
                score: ((_a = takenExam.result) === null || _a === void 0 ? void 0 : _a.totalScore) || 0,
                id: takenExam.exam.id,
                title: takenExam.exam.title,
                courseCode: takenExam.exam.courseCode,
            };
        });
        return {
            examHistory,
            activeExams,
            pastExamHistory,
            overallPerformance,
        };
    }
    async getSemesterExamResults(studentId) {
        const examResults = await this.prisma.takenExam.findMany({
            where: {
                userId: studentId,
                endedAt: {
                    not: null,
                },
            },
            select: {
                exam: {
                    select: {
                        courseCode: true,
                        title: true,
                    },
                },
                result: {
                    select: {
                        totalScore: true,
                        grade: true,
                    },
                },
            },
        });
        const formattedResults = examResults.map((takenExam) => {
            var _a, _b;
            return ({
                courseCode: takenExam.exam.courseCode,
                courseTitle: takenExam.exam.title,
                score: ((_a = takenExam.result) === null || _a === void 0 ? void 0 : _a.totalScore) || 0,
                grade: ((_b = takenExam.result) === null || _b === void 0 ? void 0 : _b.grade) || 'N/A',
            });
        });
        return formattedResults;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map