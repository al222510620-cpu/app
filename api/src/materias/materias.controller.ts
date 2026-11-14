import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  create(@Body(new ValidationPipe()) createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Post('masivo')
  insertMasivo(@Body() lecturas: Materia[]) {
    return this.materiasService.insertMasivo(lecturas);
  }

  @Get()
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id_materia')
  findOne(@Param('id_materia', ParseIntPipe) id_materia: number) {
    return this.materiasService.findOne(id_materia);
  }

  @Patch(':id_materia')
  update(
    @Param('id_materia', ParseIntPipe) id_materia: number,
    @Body(new ValidationPipe()) updateMateriaDto: UpdateMateriaDto,
  ) {
    return this.materiasService.update(id_materia, updateMateriaDto);
  }

  @Delete(':id_materia')
  remove(@Param('id_materia', ParseIntPipe) id_materia: number) {
    return this.materiasService.remove(id_materia);
  }
}
