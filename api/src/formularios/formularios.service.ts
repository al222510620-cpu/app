import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { Formulario } from './entities/formulario.entity';

@Injectable()
export class FormulariosService {
  constructor(
    @InjectRepository(Formulario, 'postgres-connection')
    private formularioRepository: Repository<Formulario>,
  ) {}

  async create(data: CreateFormularioDto) {
    const hash = await bcrypt.hash(data.password, 10);
    const register = this.formularioRepository.create({
      username: data.username.trim(),
      password: hash,
      edad: data.edad,
      estado_civil: data.estado_civil.trim(),
    });
    const saved = await this.formularioRepository.save(register);
    const { password, ...sinPassword } = saved;
    return sinPassword;
  }

  async findAll() {
    return await this.formularioRepository.find({ order: { id_formulario: 'DESC' } });
  }

  async remove(id_formulario: number) {
    const result = await this.formularioRepository.delete(id_formulario);
    if (!result.affected) {
      throw new NotFoundException('El registro no existe');
    }
    return result;
  }
}
