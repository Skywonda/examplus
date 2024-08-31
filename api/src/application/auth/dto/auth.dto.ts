import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidationArguments,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Email must be a string',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string;

  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;

  @IsString({
    message: 'Matric number must be a string',
  })
  @IsOptional()
  matricNumber?: string;

  @IsString({
    message: 'Lecturer ID must be a string',
  })
  @IsOptional()
  lecturerId?: string;

  @IsEnum(UserType, {
    message: 'Type must be one of the following: STUDENT, LECTURER',
  })
  type: UserType;
}

export class LoginUserDto {
  @IsString({
    message: 'Email must be a string',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string;

  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  @IsEnum(UserType, {
    message: 'Type must be one of the following: STUDENT, LECTURER',
  })
  type: UserType;
}
