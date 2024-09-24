import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  text: string;

  @IsString()
  imageSource: string;

  @MinLength(2)
  @MaxLength(7)
  @IsString()
  id: string;
}
