export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const calculateTimeRemaining = (examData) => {
  if (examData?.takenExams && examData?.takenExams.length > 0) {
    const examStartedAt = new Date(examData.takenExams[0].startedAt);
    const currentTime = new Date();
    const examDurationMs = examData.duration * 1000;
    const timeElapsedMs = currentTime.getTime() - examStartedAt.getTime();
    return Math.ceil(Math.max(examDurationMs - timeElapsedMs, 0) / 1000);
  }
  return examData?.duration;
};