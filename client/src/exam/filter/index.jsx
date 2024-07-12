import React from "react";

const ExamListFilter = ({ filters }) => {
  return (
    <div className="flex items-center text-[#A4A4A4] py-2">
      {filters.map((filter) => (
        <span className="mr-5 text-xs" key={filter}>
          {filter}
        </span>
      ))}
    </div>
  );
};

export default ExamListFilter;
