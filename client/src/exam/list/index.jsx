// function formatTimeLeft(time) {
//   const days = Math.floor(time / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((time % (1000 * 60)) / 1000);

//   return { days, hours, minutes, seconds };
// }

const formatTime = (timestamp) => {
  const currentTime = new Date();
  const targetTime = new Date(timestamp);

  const timeDifferenceMs = targetTime.getTime() - currentTime.getTime();

  if (timeDifferenceMs <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const totalSeconds = Math.floor(timeDifferenceMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return { days, hours, minutes };
};

const statusIcon = {
  Active: "🟣",
  Completed: "✅",
  Unavailable: "🚫",
  Ongoing: "🟢",
};

const ExamList = ({ exams }) => {
  return (
    <div className="space-y-5">
      {exams.map(
        ({ id, title, courseCode, creator, status, dueDate }, index) => {
          const { days, hours, minutes } = formatTime(dueDate);
          return (
            <a
              href={`/exam/${id}/questions`}
              key={index}
              className="container flex items-center py-2 shadow-lg rounded-lg m-0 mt-5  px-10 border-2 justify-between"
            >
              <div className="text-xs space-y-5">
                <h1 className="font-semibold text-2xl">{`${courseCode} Exam`}</h1>
                <p className="text-lg">{title}</p>
                <p className="text-base">{creator.name}</p>
                <p className="text-[10px]">
                  {`${days}d ${hours}h ${minutes}m left`}
                </p>
              </div>
              <div>
                <span className="font-bold text-xl flex">
                  {status}{" "}
                  <span className="text-3xl ml-5">
                    {
                      statusIcon[
                        status.charAt(0).toUpperCase() + status.slice(1)
                      ]
                    }
                  </span>
                </span>
              </div>
            </a>
          );
        }
      )}
    </div>
  );
};

export default ExamList;
