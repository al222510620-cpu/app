import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { EstadoEquipo } from '../entities/inventario.entity';

export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre_equipo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  codigo_inventario: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  marca: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  modelo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  numero_serie: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  ubicacion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  responsable: string;

  @IsEnum(EstadoEquipo)
  estado: EstadoEquipo;

  @IsDateString()
  fecha_compra: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observaciones?: string | null;

  @IsOptional()
  @IsString()
  imagen?: string | null;
}
