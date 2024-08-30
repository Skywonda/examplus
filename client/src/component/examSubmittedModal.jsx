import examCompleted from "asset/exam-completed.png";

const ExamSubmittedModal = ({ score, totalGotten }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-md p-4">
          <img src={examCompleted} alt="Exam completed" />
          <h2 className="text-2xl font-bold text-center">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-center">
            You've successfully completed your exam. Great job!
          </p>
          <p className="text-center">
            Your score is {score}%, you got {totalGotten} question correctly.
          </p>
          <div className="mt-4 text-center">
            <a href="/">
              <a className="py-2 px-4 bg-blue-500 text-white rounded-md">
                Go back home
              </a>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSubmittedModal;
