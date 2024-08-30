import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StudentDashboard = ({
  examHistoryData,
  overallPerformance,
  activeExams,
  pastExams,
}) => {
  const totalExams = activeExams.length + pastExams.length;
  const ongoingExams = activeExams.length;
  const completedExams = pastExams.length;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-[200px]">
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Total Exams</h3>
          <p className="text-4xl font-bold">{totalExams}</p>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Ongoing Exams</h3>
          <p className="text-4xl font-bold">{ongoingExams}</p>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Completed Exams</h3>
          <p className="text-4xl font-bold">{completedExams}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exam History Bar Chart */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Exam History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examHistoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {/* <Tooltip /> */}
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
          <div style={{ width: 120, height: 120 }}>
            {" "}
            {/* Adjust size as needed */}
            <CircularProgressbar
              value={overallPerformance}
              text={`${overallPerformance}%`}
              styles={{
                // Customize the progress bar appearance here
                path: { stroke: `#7a00e6` }, // Purple color for progress
                trail: { stroke: "#dfa3f5" }, // Light purple for background
                text: { fill: "#333", fontSize: "24px" }, // Text styles
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-6 px-0">
        {/* Active Exams Section */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6 overflow-x-auto">
          {" "}
          <h2 className="text-xl font-semibold mb-4">Active Exams</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeExams.map((exam) => (
                <tr key={exam.id}>
                  <td className="border px-4 py-2">{exam.title}</td>
                  <td className="border px-4 py-2">{exam.courseCode}</td>
                  <td className="border px-4 py-2">{exam.dueDate}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={`/exam/${exam.id}/questions`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Take Exam
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-md p-6 overflow-x-auto mt-5">
          {" "}
          <h2 className="text-xl font-semibold mb-4">Past Exams</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pastExams.map((exam) => (
                <tr key={exam.id}>
                  <td className="border px-4 py-2">{exam.title}</td>
                  <td className="border px-4 py-2">{exam.courseCode}</td>
                  <td className="border px-4 py-2">{exam.score}%</td>
                  <td className="border px-4 py-2">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      View Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
