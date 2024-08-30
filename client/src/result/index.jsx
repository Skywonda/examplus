import Result from "component/studentResult";
import StudentProfile from "component/profile";
import { api } from "utils/api";
import Loading from "component/loading";

const StudentResult = () => {
  const {
    data: results,
    isSuccess,
    isLoading,
    isError,
  } = api.useGet("/user/exam-results");
  const profileData = {
    fullname: "Samuel Ayobami",
    matric_no: "CSC/28/234",
    level: "300 Level",
    course: "Software Engineering",
    department: "CSC",
    faculty: "Software Engineering",
  };

  // const result = [
  //   {
  //     courseTitle: "Software Engineering",
  //     courseCode: "CSCE 200",
  //     score: 90,
  //     grade: "A",
  //   },
  //   {
  //     courseTitle: "Software Engineering",
  //     courseCode: "CSCE 200",
  //     score: 90,
  //     grade: "A",
  //   },
  //   {
  //     courseTitle: "Software Engineering",
  //     courseCode: "CSCE 200",
  //     score: 90,
  //     grade: "A",
  //   },
  // ];
  return (
    <div>
      <div className="px-8">
        <div>
          <h1 className="text-2xl font-bold">Results</h1>
          <StudentProfile data={profileData} />
        </div>
      </div>
      {isError && <div className="mt-20">Something went wrong</div>}
      {isLoading && (
        <div className="flex flex-col justify-center">
          <Loading message={"Loading results..."} />
        </div>
      )}
      {isSuccess && (
        <div className="mt-20">
          <Result examData={results} />
        </div>
      )}
    </div>
  );
};

export default StudentResult;
