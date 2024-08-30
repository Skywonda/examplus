import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Exam, Question, TakenExam, UserType } from '@prisma/client';
import { CreateExamDto, SubmitAnswerDto } from './dto/exam.dto';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Injectable()
export class ExamService {
  constructor(private prisma: DatabaseService) {}

  async createExam(data: CreateExamDto, creatorId: string): Promise<Exam> {
    const { questions, ...examData } = data;
    questions.map((each) => {
      if (!each.options.includes(each.answer))
        throw new BadRequestException('Answer not found in options');
    });
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
    return this.prisma.exam.create({
      data: {
        ...examData,
        dueDate,
        creator: { connect: { id: creatorId } },
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
      include: { questions: true },
    });
  }

  async getExam(examId: string, userId: string): Promise<Exam> {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: true,
        creator: true,
        takenExams: { include: { result: true } },
      },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.creator.id !== userId) {
      exam.questions = exam.questions.map((q) => ({ ...q, answer: undefined }));
    }

    return exam;
  }

  async listExamsForStudent(userId: string): Promise<Exam[]> {
    const exams = await this.prisma.exam.findMany({
      include: { creator: { select: { name: true } } },
    });
    const examsWithStatus = await Promise.all(
      exams.map(async (exam) => {
        let status = 'unavailable';
        const hasTakenExam = await this.prisma.takenExam.findFirst({
          where: { examId: exam.id, userId },
          select: { id: true, startedAt: true, endedAt: true },
        });
        if (hasTakenExam) {
          if (hasTakenExam.endedAt) {
            status = 'completed';
          } else {
            status = 'ongoing';
          }
        } else if (exam.dueDate && exam.dueDate > new Date()) {
          status = 'active';
        }
        return { ...exam, status };
      }),
    );
    return examsWithStatus;
  }

  async listExams(userId: string, userType: UserType): Promise<Exam[]> {
    if (userType === UserType.LECTURER) {
      return this.prisma.exam.findMany({
        where: { creatorId: userId },
        include: { questions: true },
      });
    } else {
      return this.prisma.exam.findMany();
    }
  }

  async startExam(examId: string, userId: string): Promise<TakenExam> {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
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

  async submitExam(
    takenExamId: string,
    answers: SubmitAnswerDto[],
  ): Promise<TakenExam> {
    const takenExam = await this.prisma.takenExam.findUnique({
      where: { id: takenExamId },
      include: { exam: { include: { questions: true } } },
    });

    if (!takenExam) {
      throw new NotFoundException('Taken exam not found');
    }

    if (takenExam.endedAt) {
      throw new ForbiddenException('Exam has already been submitted');
    }

    const { score, correctAnswers } = this.calculateScore(
      takenExam.exam.questions,
      answers,
    );
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

  async getExamResult(takenExamId: string, userId: string): Promise<TakenExam> {
    const takenExam = await this.prisma.takenExam.findUnique({
      where: { id: takenExamId },
      include: {
        exam: { include: { questions: true } },
        answers: true,
        user: true,
      },
    });

    if (!takenExam) {
      throw new NotFoundException('Taken exam not found');
    }

    if (takenExam.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view this result',
      );
    }

    return takenExam;
  }

  private calculateScore(
    questions: Question[],
    answers: SubmitAnswerDto[],
  ): { correctAnswers: number; score: number } {
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

  private calculateGrade(score: number): string {
    if (score >= 90) {
      return 'A';
    } else if (score >= 80) {
      return 'B';
    } else if (score >= 70) {
      return 'C';
    } else if (score >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
