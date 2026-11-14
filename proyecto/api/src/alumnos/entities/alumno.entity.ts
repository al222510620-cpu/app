import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id_alumno: number;

  @Column({ type: 'nvarchar', length: 60 })
  nombre: string;

  @Column({ type: 'nvarchar', length: 60 })
  apellido: string;

  @Column({ type: 'int' })
  grado: number;

  @Column({ type: 'nvarchar', length: 2 })
  grupo: string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  @Column({ type: 'float' })
  promedio: number;

  @Column({ type: 'bit', default: true })
  activo: boolean;
}
