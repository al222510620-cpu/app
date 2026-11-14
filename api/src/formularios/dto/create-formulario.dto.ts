import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateFormularioDto {
  @IsString({ message: 'El nombre es obligatorio' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre es demasiado largo' })
  username: string;

  @IsString({ message: 'La contraseña es obligatoria' })
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  @MaxLength(100, { message: 'La contraseña es demasiado larga' })
  password: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor a 0' })
  @Max(120, { message: 'La edad no es válida' })
  edad: number;

  @IsString({ message: 'El estado civil es obligatorio' })
  @IsNotEmpty({ message: 'El estado civil es obligatorio' })
  @MaxLength(30, { message: 'El estado civil es demasiado largo' })
  estado_civil: string;
}
