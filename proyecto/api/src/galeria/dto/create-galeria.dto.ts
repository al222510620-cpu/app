import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGaleriaDto {
  @IsString({ message: 'La imagen no es válida' })
  @IsNotEmpty({ message: 'Falta la imagen' })
  imagen: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'La descripción es demasiado larga' })
  descripcion?: string | null;
}
