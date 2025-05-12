import { IsDate, IsString } from 'class-validator';
import { LoginInput } from './login-input.dto';

export class RegisterInput extends LoginInput {
  @IsString()
  name: string;
  @IsString()
  confirmPassword: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  @IsString()
  ssn: string;
  @IsDate()
  dateOfBirth: Date;
}
