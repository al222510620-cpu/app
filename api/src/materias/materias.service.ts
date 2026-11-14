import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia, 'mssql-connection')
    private materiaRepository: Repository<Materia>,
  ) {}

  async create(data: CreateMateriaDto) {
    const register = this.materiaRepository.create(data);
    return await this.materiaRepository.save(register);
  }

  async findAll() {
    return await this.materiaRepository.find({ order: { id_materia: 'ASC' } });
  }

  async findOne(id_materia: number) {
    return await this.materiaRepository.findBy({ id_materia });
  }

  async update(id_materia: number, data: UpdateMateriaDto) {
    return await this.materiaRepository.update(id_materia, data);
  }

  async remove(id_materia: number) {
    try {
      return await this.materiaRepository.delete(id_materia);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('No se puede borrar: la materia tiene calificaciones registradas');
      }
      throw error;
    }
  }

  async insertMasivo(lecturas: Partial<Materia>[], tamanoLote = 200) {
    if (!Array.isArray(lecturas)) {
      throw new BadRequestException('El body debe ser un arreglo de registros');
    }
    for (let i = 0; i < lecturas.length; i += tamanoLote) {
      await this.materiaRepository.insert(lecturas.slice(i, i + tamanoLote));
    }
    return { datos_ingresados: lecturas.length };
  }
}
