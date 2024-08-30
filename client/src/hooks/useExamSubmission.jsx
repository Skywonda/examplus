import { api } from "utils/api";

export const useExamSubmission = (examId) => {
  const {
    mutate: submitExam,
    error,
    isSuccess,
    data,
  } = api.usePost(`exams/${examId}/submit`);

  const handleSubmit = async (takenExamId, questions, answers) => {
    const answersDto = questions?.map((question, index) => ({
      questionId: question.id,
      answer: answers[index],
    }));

    submitExam({ takenExamId, answers: answersDto });
  };

  return { handleSubmit, error, isSuccess, data };
};
