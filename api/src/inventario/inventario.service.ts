import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario, 'mssql-connection')
    private inventarioRepository: Repository<Inventario>,
  ) {}

  private async validarCodigo(codigo: string, idActual?: number) {
    const existe = await this.inventarioRepository.findOne({
      where: idActual
        ? { codigo_inventario: codigo, id_inventario: Not(idActual) }
        : { codigo_inventario: codigo },
    });
    if (existe) {
      throw new ConflictException(`Ya existe un equipo con el código ${codigo}`);
    }
  }

  async create(data: CreateInventarioDto) {
    await this.validarCodigo(data.codigo_inventario);
    const register = this.inventarioRepository.create(data as Partial<Inventario>);
    return await this.inventarioRepository.save(register);
  }

  async findAll() {
    return await this.inventarioRepository.find({ order: { id_inventario: 'ASC' } });
  }

  async findOne(id_inventario: number) {
    return await this.inventarioRepository.findBy({ id_inventario });
  }

  async update(id_inventario: number, data: UpdateInventarioDto) {
    if (data.codigo_inventario) {
      await this.validarCodigo(data.codigo_inventario, id_inventario);
    }
    return await this.inventarioRepository.update(id_inventario, data as Partial<Inventario>);
  }

  async remove(id_inventario: number) {
    return await this.inventarioRepository.delete(id_inventario);
  }

  async insertMasivo(lecturas: Partial<Inventario>[], tamanoLote = 150) {
    if (!Array.isArray(lecturas)) {
      throw new BadRequestException('El body debe ser un arreglo de registros');
    }
    for (let i = 0; i < lecturas.length; i += tamanoLote) {
      await this.inventarioRepository.insert(lecturas.slice(i, i + tamanoLote));
    }
    return { datos_ingresados: lecturas.length };
  }
}
