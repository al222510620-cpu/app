import { Injectable } from '@nestjs/common';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';

@Injectable()
export class CalificacionesService {
  create(createCalificacioneDto: CreateCalificacioneDto) {
    return 'This action adds a new calificacione';
  }

  findAll() {
    return `This action returns all calificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calificacione`;
  }

  update(id: number, updateCalificacioneDto: UpdateCalificacioneDto) {
    return `This action updates a #${id} calificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} calificacione`;
  }
}
