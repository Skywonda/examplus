import React from "react";
import test from "asset/exam-bg.png";
import clock from "asset/clock.png";
import { formatTime } from "utils/time.utils";

const ExamHeader = ({
  courseCode,
  title,
  creatorName,
  questionCount,
  timeRemaining,
}) => (
  <div
    className="bg-cover bg-no-repeat"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${test})`,
      height: "30vh",
    }}
  >
    <div className="text-white px-8 py-10 flex justify-between items-center">
      <div className="space-y-3 font-bold">
        <h1 className="text-[2rem]">{courseCode}</h1>
        <p className="text-2xl">{title}</p>
        <p className="text-xl">{creatorName}</p>
        <p className="font-medium">{questionCount} questions</p>
      </div>
      <div className="flex flex-col items-center h-full mr-16">
        <div className="w-[43px] h-[51]">
          <img src={clock} alt="clock" />
        </div>
        <p className="text-3xl">{formatTime(timeRemaining)}</p>
      </div>
    </div>
  </div>
);

export default ExamHeader;
