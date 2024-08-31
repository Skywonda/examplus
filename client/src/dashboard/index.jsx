import Loading from "component/loading";
import StudentDashboard from "component/studentDashboard";
import { api } from "utils/api";

function StudentHomePage() {
  const { data, isSuccess, isLoading } = api.useGet("/user/student-dashboard");
  return (
    <div>
      {isLoading && (
        <div>
          <Loading message={"Loading dashboard..."} />
        </div>
      )}
      {isSuccess && (
        <StudentDashboard
          examHistoryData={data.examHistory}
          overallPerformance={data.overallPerformance}
          activeExams={data.activeExams}
          pastExams={data.pastExamHistory}
        />
      )}
    </div>
  );
}

export default StudentHomePage;
