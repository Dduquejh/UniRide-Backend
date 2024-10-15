import { IsNotEmpty, IsString } from 'class-validator';

export class searchTripsUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
