import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNeighborhoodDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  zoneId: string;
}
