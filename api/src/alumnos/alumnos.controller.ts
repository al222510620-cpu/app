import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Post('masivo')
  insertMasivo(@Body() lecturas: Alumno[]) {
    return this.alumnosService.insertMasivo(lecturas);
  }

  @Get()
  findAll() {
    return this.alumnosService.findAll();
  }

  @Get(':id_alumno')
  findOne(@Param('id_alumno', ParseIntPipe) id_alumno: number) {
    return this.alumnosService.findOne(id_alumno);
  }

  @Patch(':id_alumno')
  update(
    @Param('id_alumno', ParseIntPipe) id_alumno: number,
    @Body(new ValidationPipe()) updateAlumnoDto: UpdateAlumnoDto,
  ) {
    return this.alumnosService.update(id_alumno, updateAlumnoDto);
  }

  @Delete(':id_alumno')
  remove(@Param('id_alumno', ParseIntPipe) id_alumno: number) {
    return this.alumnosService.remove(id_alumno);
  }
}
