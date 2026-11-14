import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  area: string;

  @IsInt()
  @Min(1)
  @Max(40)
  horas_semana: number;

  @IsBoolean()
  obligatoria: boolean;
}
