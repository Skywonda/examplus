import Button from "./button";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const StartExamConfirmationModal = ({ handleStartExam }) => {
  return (
    <Alert>
      <AlertTitle>Confirm Exam Start</AlertTitle>
      <AlertDescription>
        Are you sure you want to start the exam? Once started, the timer cannot
        be paused.
      </AlertDescription>
      <div className="mt-4 flex justify-end space-x-4">
        <Button onClick={handleStartExam}>Start Exam</Button>
        <Button onClick={() => window.history.back()} variant="outline">
          Cancel
        </Button>
      </div>
    </Alert>
  );
};

export default StartExamConfirmationModal;
