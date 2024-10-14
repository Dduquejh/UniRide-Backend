import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class searchTripsDto {
  @IsString()
  @IsNotEmpty()
  zoneId: string;

  @IsString()
  @IsOptional()
  fromOrTo: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  hour: string;
}
