import { useCallback, useState, useEffect } from "react";
import Button from "../../component/button";
import test from "../../asset/exam-bg.png";
import clock from "../../asset/clock.png";
import { api } from "utils/api";
import { useParams } from "react-router-dom";
import StartExamConfirmationModal from "component/startExamConfirmationModal";
import Loading from "component/loading";
import ExamSubmittedModal from "component/examSubmittedModal";

const ExamQuestions = () => {
  const params = useParams();

  const {
    data,
    isLoading,
    isSuccess: isExamFetchSuccess,
  } = api.useGet(`exams/${params.id}`);

  const {
    isLoading: isStartingExam,
    isSuccess: isExamStarted,
    data: startExamData,
    mutate: startExam,
  } = api.usePost(`exams/${params.id}/start`);

  const {
    mutate: submitExam,
    error: examSubmitError,
    isSuccess: isExamSubmitted,
  } = api.usePost(`exams/${params.id}/submit`);

  const [answers, setAnswers] = useState(
    new Array(data?.questions.length).fill(null)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(data?.duration);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(true);

  useEffect(() => {
    let timer;
    if (isExamStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining <= 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isExamStarted, timeRemaining]);

  useEffect(() => {
    if (data?.takenExams && data?.takenExams.length > 0) {
      const examStartedAt = new Date(data.takenExams[0].startedAt);
      const currentTime = new Date();

      const examDurationMs = data.duration * 1000;

      const timeElapsedMs = currentTime.getTime() - examStartedAt.getTime();
      const remainingTimeMs = Math.max(examDurationMs - timeElapsedMs, 0);

      setTimeRemaining(Math.ceil(remainingTimeMs / 1000));
    } else {
      setTimeRemaining(data?.duration);
    }
  }, [isExamFetchSuccess, data?.takenExams, data?.duration]);

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
  }, [isExamStarted]);
  const handleAnswerChange = useCallback(
    (event) => {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion] = event.target.value;
        return newAnswers;
      });
    },
    [currentQuestion]
  );

  const handleNextQuestion = () => {
    if (currentQuestion < data?.questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    }
  };

  const handleSubmit = async () => {
    const takenExamId = data.takenExams[0].id;

    const answersDto = data?.questions.map((question, index) => ({
      questionId: question.id,
      answer: answers[index],
    }));

    submitExam({ takenExamId, answers: answersDto });
    console.log("Exam submitted successfully!");
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    startExam();
    setShowConfirmationAlert(false);
  };

  // if (isExamSubmitError) {
  //   return (
  //     <div className="flex justify-center items-center h-[600px]">
  //       <h1>Something went wrong. Please try again.</h1>
  //     </div>
  //   );
  // }

  if (
    isExamSubmitted ||
    (isExamFetchSuccess && data.endedAt) ||
    (examSubmitError &&
      examSubmitError.response.data.message ===
        "Exam has already been submitted")
  ) {
    // window.location.href = `/`;
    return <ExamSubmittedModal score={90} />;
  }
  if (showConfirmationAlert) {
    return <StartExamConfirmationModal handleStartExam={handleStartExam} />;
  }

  if (!isExamStarted || isLoading) {
    return null;
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
      <div className="p-5">
        <div
          className="bg-cover bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${test})`,
            height: "30vh",
          }}
        >
          <div className="text-white px-8 py-10 flex justify-between items-center">
            <div className="space-y-3 font-bold">
              <h1 className="text-[2rem]">{data?.courseCode}</h1>
              <p className="text-2xl">{data?.title}</p>
              <p className="text-xl">{data?.creator.name}</p>
              <p className="font-medium">{data?.questions.length} questions</p>
            </div>
            <div className="flex flex-col items-center h-full mr-16">
              <div className="w-[43px] h-[51]">
                <img src={clock} alt="clock" />
              </div>
              <p className="text-3xl">{formatTime(timeRemaining)}</p>
            </div>
          </div>
        </div>
        {currentQuestion < data?.questions.length && (
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">
              QUESTION {currentQuestion + 1}
            </h1>
            <h1 className="text-3xl font-bold mb-4 pl-10">
              {data?.questions[currentQuestion].text}
            </h1>
            <div className="grid gap-4">
              {data?.questions[currentQuestion].options.map((option, index) => (
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
              ))}
            </div>
            <div className="flex items-center justify-between  mt-32 space-x-5">
              <div>
                <p>
                  question {currentQuestion + 1} of {data?.questions.length}
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
                {currentQuestion < data?.questions.length - 1 ? (
                  <Button onClick={handleNextQuestion} className="ml-5">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className={"bg-[green] ml-5"}>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExamQuestions;
