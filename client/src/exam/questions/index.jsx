import React, { useCallback, useState } from "react";
import Button from "../../component/button";
import test from "../../asset/exam-bg.png";
import clock from "../../asset/clock.png";
import Header from "../../component/header";

const examInfo = {
  course: "Computer Science",
  courseCode: "CSC101",
  name: "Introduction to Computer Science",
  lecturer: "Dr. ABC",
  status: "Active",
  duration: "2 hours",
};

const examQuestions = [
  {
    question:
      "What is the primary purpose of the Model-View-Controller (MVC) architecture?",
    options: [
      "A. To improve database performance",
      "B. To separate concerns in an application",
      "C. To enhance graphical user interfaces",
      "D. To optimize memory usage",
    ],
  },
  {
    question: "What is the difference between a variable and a constant?",
    options: [
      "A. Constants are mutable while variables are immutable",
      "B. Variables are mutable while constants are immutable",
      "C. Both variables and constants are mutable",
      "D. Both variables and constants are immutable",
    ],
  },
  {
    question: "What is the difference between a class and an object?",
    options: [
      "A. An object is a blueprint for creating a class",
      "B. A class is a blueprint for creating an object",
      "C. Both classes and objects are blueprints for creating something",
      "D. Both classes and objects are the same thing",
    ],
  },
  {
    question: "What is the difference between a function and a method?",
    options: [
      "A. A method is a special type of function",
      "B. A function is a special type of method",
      "C. Both functions and methods are special types of something",
      "D. Both functions and methods are the same thing",
    ],
  },
  {
    question: "What is the difference between a loop and recursion?",
    options: [
      "A. A loop is a special type of recursion",
      "B. Recursion is a special type of loop",
      "C. Both loops and recursion are special types of something",
      "D. Both loops and recursion are the same thing",
    ],
  },
  {
    question:
      "What is the difference between synchronous and asynchronous programming?",
    options: [
      "A. Synchronous programming is when tasks run one after the other",
      "B. Asynchronous programming is when tasks run at the same time",
      "C. Both synchronous and asynchronous programming are the same thing",
      "D. Both synchronous and asynchronous programming are different things",
    ],
  },
];

const ExamQuestions = () => {
  const [answers, setAnswers] = useState(
    new Array(examQuestions.length).fill(null)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChange = useCallback((event, questionIndex) => {
    console.log(event.target);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = event.target.value;
      return newAnswers;
    });
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    }
  };

  return (
    <>
      <Header />
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
              <h1 className="text-[2rem]">{examInfo.courseCode}</h1>
              <p className="text-2xl">{examInfo.name}</p>
              <p className="text-xl">{examInfo.lecturer}</p>
              <p className="font-medium">30 questions</p>
            </div>
            <div className="flex flex-col items-center h-full mr-16">
              <div className="w-[43px] h-[51]">
                <img src={clock} alt="clock" />
              </div>
              <p className="text-3xl">{"3:00"}</p>
            </div>
          </div>
        </div>
        {currentQuestion < examQuestions.length && (
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">QUESTION 1</h1>
            <h1 className="text-3xl font-bold mb-4 pl-10">
              {examQuestions[currentQuestion].question}
            </h1>
            <div className="grid  gap-4">
              {examQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    className="mr-2 w-5 h-5"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={(event) =>
                      handleAnswerChange(event, currentQuestion)
                    }
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-32 space-x-5">
              <div>
                <p>question 1 of 30</p>
              </div>
              {currentQuestion > 0 && (
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className={"bg-[#DE9206]"}
                >
                  Prev
                </Button>
              )}
              {currentQuestion < examQuestions.length - 1 ? (
                <Button onClick={handleNextQuestion}>Next</Button>
              ) : (
                <Button className={"bg-[green]"}>Submit</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExamQuestions;
