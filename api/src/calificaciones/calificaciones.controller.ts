import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';
import { Calificacione } from './entities/calificacione.entity';

@Controller('calificaciones')
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCalificacioneDto: CreateCalificacioneDto) {
    return this.calificacionesService.create(createCalificacioneDto);
  }

  @Post('masivo')
  insertMasivo(@Body() lecturas: Calificacione[]) {
    return this.calificacionesService.insertMasivo(lecturas);
  }

  @Get()
  findAll() {
    return this.calificacionesService.findAll();
  }

  @Get('consultas/ejercicios')
  ejercicios() {
    return this.calificacionesService.ejercicios();
  }

  @Get(':id_calificacion')
  findOne(@Param('id_calificacion', ParseIntPipe) id_calificacion: number) {
    return this.calificacionesService.findOne(id_calificacion);
  }

  @Patch(':id_calificacion')
  update(
    @Param('id_calificacion', ParseIntPipe) id_calificacion: number,
    @Body(new ValidationPipe()) updateCalificacioneDto: UpdateCalificacioneDto,
  ) {
    return this.calificacionesService.update(id_calificacion, updateCalificacioneDto);
  }

  @Delete(':id_calificacion')
  remove(@Param('id_calificacion', ParseIntPipe) id_calificacion: number) {
    return this.calificacionesService.remove(id_calificacion);
  }
}
