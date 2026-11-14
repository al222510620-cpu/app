import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('galeria')
export class Galeria {
  @PrimaryGeneratedColumn()
  id_imagen: number;

  @Column({ type: 'text' })
  imagen: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcion: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;
}
