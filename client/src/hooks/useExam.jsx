import { calculateTimeRemaining } from "utils/time.utils";
import { useState, useEffect } from "react";
import { api } from "utils/api";

export const useExam = (examId) => {
  const { data, isLoading, isSuccess } = api.useGet(`exams/${examId}`);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (data) {
      setAnswers(new Array(data.questions.length).fill(null));
      setTimeRemaining(calculateTimeRemaining(data));
    }
  }, [data]);

  const handleAnswerChange = (event) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = event.target.value;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < data?.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    }
  };

  return {
    examData: data,
    isLoading,
    isSuccess,
    answers,
    currentQuestion,
    timeRemaining,
    setTimeRemaining,
    handleAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
  };
};
