import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateCalificacioneDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  alumno_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  materia_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  bimestre: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  calificacion: number;
}
