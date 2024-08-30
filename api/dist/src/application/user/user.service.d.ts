import { DatabaseService } from 'src/infrastructure/database/database.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    studentDashboard(studentId: string): Promise<{
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
    getSemesterExamResults(studentId: string): Promise<{
        courseCode: string;
        courseTitle: string;
        score: number;
        grade: string;
    }[]>;
}
