import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @MinLength(12)
  @MaxLength(24)
  password: string;

  @IsString()
  @MaxLength(80)
  fullName: string;

  @IsString()
  @MaxLength(15)
  phone: string;
}
