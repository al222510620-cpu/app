import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';
import { Calificacione } from './entities/calificacione.entity';
import { Alumno } from '../alumnos/entities/alumno.entity';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Calificacione, 'mssql-connection')
    private calificacionRepository: Repository<Calificacione>,
  ) {}

  async create(data: CreateCalificacioneDto) {
    const register = this.calificacionRepository.create(data);
    return await this.calificacionRepository.save(register);
  }

  async findAll() {
    return await this.calificacionRepository.find({
      relations: { alumno: true, materia: true },
      order: { id_calificacion: 'ASC' },
    });
  }

  async findOne(id_calificacion: number) {
    return await this.calificacionRepository.find({
      where: { id_calificacion },
      relations: { alumno: true, materia: true },
    });
  }

  async update(id_calificacion: number, data: UpdateCalificacioneDto) {
    return await this.calificacionRepository.update(id_calificacion, data);
  }

  async remove(id_calificacion: number) {
    return await this.calificacionRepository.delete(id_calificacion);
  }

  async insertMasivo(lecturas: Partial<Calificacione>[], tamanoLote = 200) {
    if (!Array.isArray(lecturas)) {
      throw new BadRequestException('El body debe ser un arreglo de registros');
    }
    for (let i = 0; i < lecturas.length; i += tamanoLote) {
      await this.calificacionRepository.insert(lecturas.slice(i, i + tamanoLote));
    }
    return { datos_ingresados: lecturas.length };
  }

  private async total() {
    return await this.calificacionRepository.count();
  }

  private async promedioPorMateria() {
    return await this.calificacionRepository
      .createQueryBuilder('c')
      .innerJoin('c.materia', 'm')
      .select('m.id_materia', 'id_materia')
      .addSelect('m.nombre', 'materia')
      .addSelect('AVG(c.calificacion)', 'promedio')
      .addSelect('COUNT(*)', 'registros')
      .groupBy('m.id_materia')
      .addGroupBy('m.nombre')
      .orderBy('promedio', 'DESC')
      .getRawMany();
  }

  private async promedioPorAlumno() {
    return await this.calificacionRepository
      .createQueryBuilder('c')
      .innerJoin('c.alumno', 'a')
      .select('a.id_alumno', 'id_alumno')
      .addSelect('a.nombre', 'nombre')
      .addSelect('a.apellido', 'apellido')
      .addSelect('AVG(c.calificacion)', 'promedio')
      .addSelect('COUNT(*)', 'registros')
      .groupBy('a.id_alumno')
      .addGroupBy('a.nombre')
      .addGroupBy('a.apellido')
      .orderBy('promedio', 'DESC')
      .getRawMany();
  }

  private async menoresA7() {
    return await this.calificacionRepository.find({
      where: { calificacion: LessThan(7) },
      relations: { alumno: true, materia: true },
      order: { calificacion: 'ASC' },
    });
  }

  private async bimestre1() {
    return await this.calificacionRepository
      .createQueryBuilder('c')
      .innerJoin('c.alumno', 'a')
      .innerJoin('c.materia', 'm')
      .select('c.id_calificacion', 'id_calificacion')
      .addSelect('a.nombre', 'nombre')
      .addSelect('a.apellido', 'apellido')
      .addSelect('m.nombre', 'materia')
      .addSelect('c.calificacion', 'calificacion')
      .where('c.bimestre = :bimestre', { bimestre: 1 })
      .orderBy('c.id_calificacion', 'ASC')
      .getRawMany();
  }

  private async materiasBajoPromedio() {
    return await this.calificacionRepository
      .createQueryBuilder('c')
      .innerJoin('c.materia', 'm')
      .select('m.id_materia', 'id_materia')
      .addSelect('m.nombre', 'materia')
      .addSelect('AVG(c.calificacion)', 'promedio')
      .groupBy('m.id_materia')
      .addGroupBy('m.nombre')
      .having('AVG(c.calificacion) < (SELECT AVG(c2.calificacion) FROM calificaciones c2)')
      .orderBy('promedio', 'ASC')
      .getRawMany();
  }

  private async alumnosSinCalificaciones() {
    return await this.calificacionRepository.manager
      .createQueryBuilder(Alumno, 'a')
      .leftJoin(Calificacione, 'c', 'c.alumno_id = a.id_alumno')
      .where('c.id_calificacion IS NULL')
      .orderBy('a.id_alumno', 'ASC')
      .getMany();
  }

  async ejercicios() {
    const promedioGeneral = await this.calificacionRepository
      .createQueryBuilder('c')
      .select('AVG(c.calificacion)', 'promedio')
      .getRawOne<{ promedio: number | null }>();

    const porAlumno = await this.promedioPorAlumno();

    return {
      promedioGeneral: promedioGeneral?.promedio ?? 0,
      total: await this.total(),
      promedioPorMateria: await this.promedioPorMateria(),
      promedioPorAlumno: porAlumno,
      menoresA7: await this.menoresA7(),
      bimestre1: await this.bimestre1(),
      mejorAlumno: porAlumno[0] ?? null,
      materiasBajoPromedio: await this.materiasBajoPromedio(),
      alumnosSinCalificaciones: await this.alumnosSinCalificaciones(),
    };
  }
}
