import Result from "component/studentResult";
import StudentProfile from "component/profile";
import { api } from "utils/api";
import Loading from "component/loading";
import CGPATable from "component/cgpTable";

const StudentResult = () => {
  const {
    data: results,
    isSuccess,
    isLoading,
    isError,
  } = api.useGet("/user/exam-results");

  const {
    data,
    isSuccess: cgpaSuccess,
    isLoading: cgpaLoading,
    isError: cgpaError,
  } = api.useGet("/user/cgpa");
  const profileData = {
    fullname: "Samuel Ayobami",
    matric_no: "CSC/28/234",
    level: "300 Level",
    course: "Software Engineering",
    department: "CSC",
    faculty: "Software Engineering",
  };

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

      {cgpaError && <div className="mt-20">Something went wrong</div>}
      {cgpaLoading && (
        <div className="flex flex-col justify-center">
          <Loading message={"Loading results..."} />
        </div>
      )}

      {cgpaSuccess && (
        <div className="mt-20">
          <CGPATable data={data} />
        </div>
      )}
    </div>
  );
};

export default StudentResult;
