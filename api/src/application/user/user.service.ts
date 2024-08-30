import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async studentDashboard(studentId: string) {
    const [examHistoryData, activeExams, pastExams] = await Promise.all([
      // exam history
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
      // active exams
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

      // past exams
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

    const totalScore = pastExams.reduce(
      (sum, exam) => sum + (exam.result?.totalScore || 0),
      0,
    );
    const overallPerformance =
      parseFloat(((totalScore / (pastExams.length * 100)) * 100).toFixed(2)) ||
      0;

    const examHistory = examHistoryData.map((takenExam) => {
      return {
        title: takenExam.exam.title,
        score: takenExam.result?.totalScore || 0,
      };
    });

    const pastExamHistory = pastExams.map((takenExam) => {
      return {
        score: takenExam.result?.totalScore || 0,
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

  async getSemesterExamResults(studentId: string) {
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

    const formattedResults = examResults.map((takenExam) => ({
      courseCode: takenExam.exam.courseCode,
      courseTitle: takenExam.exam.title,
      score: takenExam.result?.totalScore || 0,
      grade: takenExam.result?.grade || 'N/A',
    }));

    return formattedResults;
  }
}
