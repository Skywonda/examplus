import ExamListFilter from "./filter";
import ExamList from "./list";

const examList = [
  {
    course: "Computer Science",
    courseCode: "CSC101",
    name: "Introduction to Computer Science",
    lecturer: "Dr. ABC",
    status: "Active",
    duration: "2 hours",
  },
  {
    course: "Computer Science",
    courseCode: "CSC102",
    name: "Data Structures",
    lecturer: "Dr. XYZ",
    status: "Completed",
    duration: "3 hours",
  },
  {
    course: "Mathematics",
    courseCode: "MAT101",
    name: "Calculus",
    lecturer: "Dr. PQR",
    status: "Active",
    duration: "4 hours",
  },
  {
    course: "Physics",
    courseCode: "PHY101",
    name: "Mechanics",
    lecturer: "Dr. STU",
    status: "Unavailable",
    duration: "5 hours",
  },
  {
    course: "Biology",
    courseCode: "BIO101",
    name: "Cell Biology",
    lecturer: "Dr. VWX",
    status: "Completed",
    duration: "6 hours",
  },
  {
    course: "Chemistry",
    courseCode: "CHM101",
    name: "Organic Chemistry",
    lecturer: "Dr. YZA",
    status: "Active",
    duration: "7 hours",
  },
  {
    course: "Economics",
    courseCode: "ECO101",
    name: "Macroeconomics",
    lecturer: "Dr. BNM",
    status: "Unavailable",
    duration: "8 hours",
  },
  {
    course: "English",
    courseCode: "ENG101",
    name: "Literature",
    lecturer: "Dr. JKL",
    status: "Completed",
    duration: "9 hours",
  },
];

const Exam = () => {
  return (
    <div className="w-full py-2">
      <div className="text-[#464646] text-xl font-semibold flex">
        <h1>Exam</h1>
      </div>
      <ExamListFilter filters={["All", "Completed", "Active", "Unavailable"]} />
      <ExamList exams={examList} />
    </div>
  );
};

export default Exam;
