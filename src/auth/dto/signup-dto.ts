import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { Type } from '../schemas/user.schema';
import { Document } from 'mongoose';

export class SignupDto {
  @IsNotEmpty()
  readonly image_url: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Type, { message: 'Please enter a valid user type' })
  readonly type: Type;
}
