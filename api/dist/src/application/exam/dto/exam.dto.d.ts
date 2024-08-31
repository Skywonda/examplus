export declare class QuestionDto {
    text: string;
    options: string[];
    answer: string;
}
export declare class CreateExamDto {
    title: string;
    courseCode: string;
    courseUnit: string;
    description: string;
    duration: number;
    questions: QuestionDto[];
}
export declare class SubmitAnswerDto {
    questionId: string;
    answer: string;
}
