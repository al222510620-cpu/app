import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoEquipo {
  disponible = 'Disponible',
  en_uso = 'En uso',
  mantenimiento = 'En mantenimiento',
  baja = 'Dado de baja',
}

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Column({ type: 'nvarchar', length: 120 })
  nombre_equipo: string;

  @Column({ type: 'nvarchar', length: 40, unique: true })
  codigo_inventario: string;

  @Column({ type: 'nvarchar', length: 60 })
  marca: string;

  @Column({ type: 'nvarchar', length: 60 })
  modelo: string;

  @Column({ type: 'nvarchar', length: 60 })
  numero_serie: string;

  @Column({ type: 'nvarchar', length: 100 })
  ubicacion: string;

  @Column({ type: 'nvarchar', length: 100 })
  responsable: string;

  @Column({ type: 'nvarchar', length: 30, default: EstadoEquipo.disponible })
  estado: EstadoEquipo;

  @Column({ type: 'date' })
  fecha_compra: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  observaciones: string | null;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  imagen: string | null;
}
