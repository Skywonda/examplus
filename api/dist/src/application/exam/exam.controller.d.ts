import { ExamService } from './exam.service';
import { CreateExamDto, SubmitAnswerDto } from './dto/exam.dto';
export declare class ExamController {
    private examService;
    constructor(examService: ExamService);
    createExam(examData: CreateExamDto, user: any): Promise<{
        id: string;
        title: string;
        courseCode: string;
        courseUnit: number;
        description: string;
        duration: number;
        dueDate: Date;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    listExams(user: any): Promise<{
        id: string;
        title: string;
        courseCode: string;
        courseUnit: number;
        description: string;
        duration: number;
        dueDate: Date;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }[]>;
    listStudentExams(user: any): Promise<{
        id: string;
        title: string;
        courseCode: string;
        courseUnit: number;
        description: string;
        duration: number;
        dueDate: Date;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }[]>;
    getExam(id: string, user: any): Promise<{
        id: string;
        title: string;
        courseCode: string;
        courseUnit: number;
        description: string;
        duration: number;
        dueDate: Date;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    startExam(id: string, user: any): Promise<{
        id: string;
        startedAt: Date;
        endedAt: Date;
        userId: string;
        examId: string;
    }>;
    submitExam(id: string, body: {
        answers: SubmitAnswerDto[];
        takenExamId: string;
    }): Promise<{
        id: string;
        startedAt: Date;
        endedAt: Date;
        userId: string;
        examId: string;
    }>;
    getExamResult(id: string, user: any): Promise<{
        id: string;
        startedAt: Date;
        endedAt: Date;
        userId: string;
        examId: string;
    }>;
}
