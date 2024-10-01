import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEiaEmail } from '../validator/is-eia-email.validator';

export class CreateAuthDto {
  @IsEiaEmail()
  email: string;

  @MinLength(6)
  @MaxLength(24)
  password: string;

  @IsString()
  @MaxLength(80)
  fullName: string;

  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo puede contener números',
  })
  @MaxLength(15)
  phone: string;
}
