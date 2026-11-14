import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('formularios')
export class Formulario {
  @PrimaryGeneratedColumn()
  id_formulario: number;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'varchar', length: 30 })
  estado_civil: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;
}
