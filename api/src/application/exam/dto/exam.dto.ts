import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUUID,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  answer: string;
}

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsNumberString()
  courseUnit: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class SubmitAnswerDto {
  @IsUUID()
  questionId: string;

  @IsString()
  answer: string;
}
