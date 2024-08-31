import { UserService } from './user.service';
import { ExamService } from '../exam/exam.service';
export declare class UserController {
    private readonly userService;
    private readonly examService;
    constructor(userService: UserService, examService: ExamService);
    studentDashboard({ id }: {
        id: any;
    }): Promise<{
        examHistory: {
            title: string;
            score: number;
        }[];
        activeExams: {
            id: string;
            title: string;
            courseCode: string;
            dueDate: Date;
        }[];
        pastExamHistory: {
            score: number;
            id: string;
            title: string;
            courseCode: string;
        }[];
        overallPerformance: number;
    }>;
    getExamResults({ id }: {
        id: any;
    }): Promise<{
        courseCode: string;
        courseTitle: string;
        score: number;
        grade: string;
    }[]>;
    getStudentCGPA(user: any): Promise<{
        TNU: number;
        TCP: number;
        CGPA: number;
    }>;
}
