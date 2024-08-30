-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_takenExamId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examId_fkey";

-- DropForeignKey
ALTER TABLE "TakenExam" DROP CONSTRAINT "TakenExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "TakenExam" DROP CONSTRAINT "TakenExam_userId_fkey";

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakenExam" ADD CONSTRAINT "TakenExam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakenExam" ADD CONSTRAINT "TakenExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_takenExamId_fkey" FOREIGN KEY ("takenExamId") REFERENCES "TakenExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
