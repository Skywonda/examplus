import { useNavigate } from 'react-router-dom';
import lecturerLoginImage from 'asset/lecturer-login.png';
import studentLoginImage from 'asset/student-login.png';

const RootAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-4 lg:px-72 mb-4">
      <div>
        <h1 className="text-3xl font-bold text-center ">Welcome to the Exam Portal</h1>
        <p className='text-center'>Please select your preferred user type to continue</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-[10%]">
        <div
          className="w-full md:w-1/2 p-4 cursor-pointer"
          onClick={() => navigate('/auth/manage/login')}
        >
          <img src={lecturerLoginImage} alt="Lecturer Login" className="w-full h-auto mb-4" />
          <p className="text-gray-600 mb-4 px-5">Login to manage exams and students.</p>
        </div>

        <div
          className="w-full md:w-1/2 p-4 cursor-pointer"
          onClick={() => navigate('/auth/login')}
        >
          <img src={studentLoginImage} alt="Student Login" className="w-full h-auto mb-4" />
          <p className="text-gray-600 mb-4 px-5">Login to take exams and view results.</p>
        </div>
      </div>
    </div>
  );
};

export default RootAuth;