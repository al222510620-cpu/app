import { IsString, MaxLength, MinLength, IsDateString, IsOptional, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'El nombre es obligatorio' })
  @MaxLength(255, { message: 'El nombre es demasiado largo' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  username: string;
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;
  @IsString({ message: 'La contraseña es obligatoria' })
  @MaxLength(255, { message: 'La contraseña es demasiado larga' })
  @MinLength(5, { message: 'La contraseña debe tener al menos 5 caracteres' })
  password: string;
  @IsString({ message: 'La ubicación es obligatoria' })
  @MaxLength(255, { message: 'La ubicación es demasiado larga' })
  @MinLength(5, { message: 'La ubicación debe tener al menos 5 caracteres' })
  location: string;
  @IsString({ message: 'La imagen no es válida' })
  image: string;
  @IsDateString()
  @IsOptional()
  update: Date;
}
