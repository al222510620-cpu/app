import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id_materia: number;

  @Column({ type: 'nvarchar', length: 60 })
  nombre: string;

  @Column({ type: 'nvarchar', length: 60 })
  area: string;

  @Column({ type: 'int' })
  horas_semana: number;

  @Column({ type: 'bit', default: true })
  obligatoria: boolean;
}
