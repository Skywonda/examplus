-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "totalScore" INTEGER,
    "grade" TEXT,
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "takenExamId" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_takenExamId_key" ON "Result"("takenExamId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_takenExamId_fkey" FOREIGN KEY ("takenExamId") REFERENCES "TakenExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
