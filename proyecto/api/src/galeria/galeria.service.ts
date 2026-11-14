import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { Galeria } from './entities/galeria.entity';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Galeria, 'postgres-connection')
    private galeriaRepository: Repository<Galeria>,
  ) {}

  async create(data: CreateGaleriaDto) {
    const register = this.galeriaRepository.create({
      imagen: data.imagen,
      descripcion: data.descripcion?.trim() || null,
    });
    return await this.galeriaRepository.save(register);
  }

  async findAll() {
    return await this.galeriaRepository.find({ order: { id_imagen: 'DESC' } });
  }

  async remove(id_imagen: number) {
    const result = await this.galeriaRepository.delete(id_imagen);
    if (!result.affected) {
      throw new NotFoundException('La imagen no existe');
    }
    return result;
  }
}
