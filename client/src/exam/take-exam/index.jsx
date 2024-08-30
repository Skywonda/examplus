import { useState, useEffect } from "react";
import Button from "../../component/button";
import { api } from "utils/api";
import { useParams } from "react-router-dom";
import StartExamConfirmationModal from "component/startExamConfirmationModal";
import Loading from "component/loading";
import ExamSubmittedModal from "component/examSubmittedModal";
import { useExam } from "hooks/useExam";
import { useExamSubmission } from "hooks/useExamSubmission";
import ExamHeader from "./examHeader";

const ExamQuestions = () => {
  const { id: examId } = useParams();

  const {
    examData,
    // isLoading,
    isSuccess: isExamFetchSuccess,
    answers,
    currentQuestion,
    timeRemaining,
    setTimeRemaining,
    handleAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useExam(examId);

  const {
    handleSubmit,
    error: examSubmitError,
    isSuccess: isExamSubmitted,
    data: examSubmitData,
  } = useExamSubmission(examId);

  const {
    isLoading: isStartingExam,
    isSuccess: isExamStarted,
    data: startExamData,
    mutate: startExam,
  } = api.usePost(`exams/${examId}/start`);

  const [showConfirmationAlert, setShowConfirmationAlert] = useState(true);

  useEffect(() => {
    let timer;
    if (isExamStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (
      timeRemaining === 0 &&
      isExamStarted &&
      !startExamData?.endedAt
    ) {
      handleSubmit(startExamData.id, examData.questions, answers);
    }
    return () => clearInterval(timer);
  }, [
    isExamStarted,
    timeRemaining,
    startExamData?.id,
    handleSubmit,
    answers,
    setTimeRemaining,
    examData?.questions,
    startExamData?.endedAt,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isExamStarted && !isExamSubmitted) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isExamStarted, isExamSubmitted]);

  const handleStartExam = () => {
    startExam();
    setShowConfirmationAlert(false);
  };

  if (
    isExamSubmitted ||
    (isExamFetchSuccess &&
      examData.takenExams.length > 0 &&
      examData.takenExams[0].endedAt) ||
    (examSubmitError &&
      examSubmitError.response.data.message ===
        "Exam has already been submitted")
  ) {
    const result = examSubmitData?.result || examData.takenExams[0]?.result;
    // window.location.href = `/`;
    return (
      <ExamSubmittedModal
        score={result.totalScore}
        totalGotten={result.correctAnswers}
      />
    );
  }

  if (showConfirmationAlert) {
    return <StartExamConfirmationModal handleStartExam={handleStartExam} />;
  }

  if (isStartingExam) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <Loading />
        <h1>Starting exam...</h1>
      </div>
    );
  }

  return (
    <>
      <ExamHeader
        courseCode={examData?.courseCode}
        title={examData?.title}
        creatorName={examData?.creator.name}
        questionCount={examData?.questions.length}
        timeRemaining={timeRemaining}
      />
      {currentQuestion < examData?.questions.length && (
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-4">
            QUESTION {currentQuestion + 1}
          </h1>
          <h1 className="text-3xl font-bold mb-4 pl-10">
            {examData?.questions[currentQuestion].text}
          </h1>
          <div className="grid gap-4">
            {examData?.questions[currentQuestion].options.map(
              (option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    className="mr-2 w-5 h-5"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={handleAnswerChange}
                  />
                  <label>{option}</label>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-between  mt-32 space-x-5">
            <div>
              <p>
                question {currentQuestion + 1} of {examData?.questions.length}
              </p>
            </div>
            <div>
              {currentQuestion > 0 && (
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className={"bg-[#DE9206]"}
                >
                  Prev
                </Button>
              )}
              {currentQuestion < examData?.questions.length - 1 ? (
                <Button onClick={handleNextQuestion} className="ml-5">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleSubmit(startExamData.id, examData?.questions, answers)
                  }
                  className={"bg-[green] ml-5"}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamQuestions;
