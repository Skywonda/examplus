// import React from "react";

// const ExamListFilter = ({ filters }) => {
//   return (
//     <div className="flex items-center text-[#A4A4A4] py-2">
//       {filters.map((filter) => (
//         <span className="mr-5 text-xs" key={filter}>
//           {filter}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default ExamListFilter;

import React from "react";

const ExamListFilter = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1 rounded ${
            activeFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ExamListFilter;
