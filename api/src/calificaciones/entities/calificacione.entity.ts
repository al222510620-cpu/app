import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Alumno } from '../../alumnos/entities/alumno.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('calificaciones')
export class Calificacione {
  @PrimaryGeneratedColumn()
  id_calificacion: number;

  @Column({ type: 'int' })
  alumno_id: number;

  @Column({ type: 'int' })
  materia_id: number;

  @Column({ type: 'int' })
  bimestre: number;

  @Column({ type: 'float' })
  calificacion: number;

  @ManyToOne(() => Alumno, { nullable: false })
  @JoinColumn({ name: 'alumno_id' })
  alumno: Alumno;

  @ManyToOne(() => Materia, { nullable: false })
  @JoinColumn({ name: 'materia_id' })
  materia: Materia;
}
