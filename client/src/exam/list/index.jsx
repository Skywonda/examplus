import React from "react";
import { Link } from "react-router-dom";

const statusIcon = {
  Active: "🟣",
  Completed: "✅",
  Unavailable: "🚫",
};
const ExamList = ({ exams }) => {
  return (
    <div className="space-y-5">
      {exams.map(({ course, name, courseCode, lecturer, status }, index) => (
        <Link
          to={"questions"}
          key={index}
          className="container flex items-center py-2 shadow-lg rounded-lg m-0 mt-5  px-10 border-2 justify-between"
        >
          <div className="text-xs space-y-5">
            <h1 className="font-semibold text-2xl">{`${courseCode} Exam`}</h1>
            <p className="text-lg">{name}</p>
            <p className="text-base">{lecturer}</p>
          </div>
          <div>
            <span className="font-bold text-xl flex">
              {status}{" "}
              <span className="text-3xl ml-5">{statusIcon[status]}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExamList;
