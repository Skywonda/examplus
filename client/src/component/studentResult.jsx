const Result = ({ examData }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Semester Exam Results for 2023/2024
      </h1>

      <table className="w-full table-auto">
        {" "}
        <thead>
          <tr>
            <th className="px-4 py-2">Course Code</th>
            <th className="px-4 py-2">Course Title</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {examData.map((exam, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{exam.courseCode}</td>{" "}
              <td className="px-4 py-2">{exam.courseTitle}</td>{" "}
              <td className="px-4 py-2">{exam.score}</td>
              <td className="px-4 py-2">{exam.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
