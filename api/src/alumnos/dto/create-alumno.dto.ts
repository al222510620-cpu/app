import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  apellido: string;

  @IsInt()
  @Min(1)
  @Max(6)
  grado: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  grupo: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  promedio: number;

  @IsBoolean()
  activo: boolean;
}
