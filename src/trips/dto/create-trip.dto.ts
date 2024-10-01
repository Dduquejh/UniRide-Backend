import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  fromOrTo: string;

  @IsString()
  @IsNotEmpty()
  date: string; // Asegúrate de que se pase en un formato de fecha válido

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsInt()
  @Min(1) // Debe ser al menos 1
  seats: number;

  @IsString()
  @MaxLength(500) // Por ejemplo, puedes limitar la longitud de la descripción
  description: string;

  @IsNotEmpty()
  userId: string; // Agregamos userId para relacionar con el usuario que crea el viaje
}
