import { Exam, TakenExam, UserType } from '@prisma/client';
import { CreateExamDto, SubmitAnswerDto } from './dto/exam.dto';
import { DatabaseService } from 'src/infrastructure/database/database.service';
export declare class ExamService {
    private prisma;
    constructor(prisma: DatabaseService);
    createExam(data: CreateExamDto, creatorId: string): Promise<Exam>;
    getExam(examId: string, userId: string): Promise<Exam>;
    listExamsForStudent(userId: string): Promise<Exam[]>;
    listExams(userId: string, userType: UserType): Promise<Exam[]>;
    startExam(examId: string, userId: string): Promise<TakenExam>;
    submitExam(takenExamId: string, answers: SubmitAnswerDto[]): Promise<TakenExam>;
    getExamResult(takenExamId: string, userId: string): Promise<TakenExam>;
    private calculateScore;
    private calculateGrade;
    calculateStudentCGPA(studentId: string): Promise<{
        TNU: number;
        TCP: number;
        CGPA: number;
    }>;
    private gradeToGradePoint;
}
