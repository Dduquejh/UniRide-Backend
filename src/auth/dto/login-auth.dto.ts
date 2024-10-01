import { IsString } from 'class-validator';
import { IsEiaEmail } from '../validator/is-eia-email.validator';

export class LoginAuthDto {
  @IsEiaEmail()
  email: string;

  @IsString()
  password: string;
}
