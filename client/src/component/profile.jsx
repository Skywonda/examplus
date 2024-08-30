const StudentProfile = ({ data }) => {
  console.log(data);
  const { fullname, matric_no, level, course, department, faculty } = data;
  return (
    <div className="p-2 pt-5">
      <div className="flex">
        <span className="w-24">Fullname</span>
        <p className="font-bold">{fullname}</p>
      </div>
      <div className="flex">
        <span className="w-24">Matric No</span>
        <p className="font-bold">{matric_no}</p>
      </div>
      <div className="flex">
        <span className="w-24">Level</span>
        <p className="font-bold">{level}</p>
      </div>
      <div className="flex">
        <span className="w-24">Course</span>
        <p className="font-bold">{course}</p>
      </div>
      <div className="flex">
        <span className="w-24">Department</span>
        <p className="font-bold">{department}</p>
      </div>
      <div className="flex">
        <span className="w-24">Faculty</span>
        <p className="font-bold">{faculty}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
