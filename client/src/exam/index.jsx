import { useState } from "react";
import ExamListFilter from "./filter";
import ExamList from "./list";
import { api } from "utils/api";
import { Loader } from "lucide-react";

// const Exam = () => {
//   return (
//     <div className="w-full py-2">
//       <div className="text-[#464646] text-xl font-semibold flex">
//         <h1>Exam</h1>
//       </div>
//       <ExamListFilter filters={["All", "Completed", "Active", "Unavailable"]} />
//       <ExamList exams={examList} />
//     </div>
//   );
// };

const Exam = () => {
  const [filter, setFilter] = useState("All");
  let filteredExams = [];

  const { data, isLoading, isSuccess } = api.useGet("/exams/student");

  if (isSuccess) {
    filteredExams = data.filter(
      (exam) => filter === "All" || exam.status === filter
    );
  }

  return (
    <div className="w-full py-2">
      <h1 className="text-2xl font-semibold mb-4">Exam</h1>
      <ExamListFilter
        filters={["All", "completed", "active", "unavailable", "ongoing"]}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-[600px]">
          <Loader />
        </div>
      )}
      {isSuccess && <ExamList exams={filteredExams} />}
    </div>
  );
};

export default Exam;
