import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno, 'mssql-connection')
    private alumnoRepository: Repository<Alumno>,
  ) {}

  async create(data: CreateAlumnoDto) {
    const register = this.alumnoRepository.create(data as Partial<Alumno>);
    return await this.alumnoRepository.save(register);
  }

  async findAll() {
    return await this.alumnoRepository.find({ order: { id_alumno: 'ASC' } });
  }

  async findOne(id_alumno: number) {
    return await this.alumnoRepository.findBy({ id_alumno });
  }

  async update(id_alumno: number, data: UpdateAlumnoDto) {
    return await this.alumnoRepository.update(id_alumno, data as Partial<Alumno>);
  }

  async remove(id_alumno: number) {
    try {
      return await this.alumnoRepository.delete(id_alumno);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('No se puede borrar: el alumno tiene calificaciones registradas');
      }
      throw error;
    }
  }

  async insertMasivo(lecturas: Partial<Alumno>[], tamanoLote = 200) {
    if (!Array.isArray(lecturas)) {
      throw new BadRequestException('El body debe ser un arreglo de registros');
    }
    for (let i = 0; i < lecturas.length; i += tamanoLote) {
      await this.alumnoRepository.insert(lecturas.slice(i, i + tamanoLote));
    }
    return { datos_ingresados: lecturas.length };
  }
}
