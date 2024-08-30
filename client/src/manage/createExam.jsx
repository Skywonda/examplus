import { useState } from "react";
import { Button } from "component/ui/button";
import Form from "component/form";
import Input from "component/input";
import Textarea from "component/text area";
import { RadioGroup, RadioGroupItem } from "component/ui/radio-group";
import { PlusCircle, Trash2 } from "lucide-react";
import { api } from "utils/api";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const {
    mutateAsync: createExam,
    isSuccess,
    isError,
    error,
  } = api.usePost("/exams");

  const handleSubmit = async (data) => {
    const durationToSeconds = (duration) => parseInt(duration) * 60;
    const payload = {
      title: data.title,
      courseCode: data.courseCode,
      courseUnit: data.courseUnit,
      description: data.description,
      duration: durationToSeconds(data.duration),
      questions,
    };

    await createExam(payload);
  };

  if (isSuccess) {
    navigate("/manage/exam");
  }

  if (isError) {
    console.log(error);
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: [""],
        answer: questions.length === 0 ? "" : questions[0].options[0],
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.filter((_, i) => i !== optionIndex);
    if (
      updatedQuestions[questionIndex].answer ===
      updatedQuestions[questionIndex].options[optionIndex]
    ) {
      updatedQuestions[questionIndex].answer = "";
    }
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Exam</h1>
      <Form
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          title: "",
          courseCode: "",
          courseUnit: "",
          description: "",
          duration: "",
          questions: [],
        }}
      >
        <Form.Element>
          <div className="mb-6">
            <Form.Field.Input
              name="title"
              placeholder="Course Title"
              className="mb-4"
            />
            <Form.Field.Input
              name="courseCode"
              placeholder="Course Code"
              className="mb-4"
            />
            <Form.Field.Input
              name="courseUnit"
              placeholder="Course Unit"
              className="mb-4"
            />
            <Form.Field.Textarea
              name="description"
              row={3}
              placeholder="Exam Description"
            />
            <Form.Field.Input
              name="duration"
              type="number"
              placeholder="Exam Duration in minutes"
              className="mb-4"
            />
          </div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-8 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Question {questionIndex + 1}
                </h2>
                <Button
                  variant="destructive"
                  type="button"
                  size="sm"
                  onClick={() => removeQuestion(questionIndex)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove Question
                </Button>
              </div>
              <Textarea
                value={question.text}
                onChange={(value) =>
                  updateQuestion(questionIndex, "text", value)
                }
                placeholder="Enter your question"
                className="mb-4"
              />
              <RadioGroup
                value={question.answer}
                onValueChange={(value) =>
                  updateQuestion(questionIndex, "answer", value)
                }
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`q${questionIndex}-option${optionIndex}`}
                    />
                    <Input
                      value={option}
                      onChange={(value) =>
                        updateOption(questionIndex, optionIndex, value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-grow"
                    />
                    {question.options.length > 2 && (
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={() => addOption(questionIndex)}
                size="sm"
                type="button"
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Option
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addQuestion} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
          </Button>
          <Button type="submit" className="mt-8 w-full">
            Save Exam
          </Button>
        </Form.Element>
      </Form>
    </div>
  );
};

export default CreateExam;
