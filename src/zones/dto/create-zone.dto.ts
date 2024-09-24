import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateZoneDto {
  @IsString()
  text: string;

  @IsString()
  imageSource: string;

  @MinLength(2)
  @MaxLength(10)
  @IsString()
  id: string;
}
