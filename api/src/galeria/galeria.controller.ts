import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDto } from './dto/create-galeria.dto';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Post()
  create(@Body(new ValidationPipe()) createGaleriaDto: CreateGaleriaDto) {
    return this.galeriaService.create(createGaleriaDto);
  }

  @Get()
  findAll() {
    return this.galeriaService.findAll();
  }

  @Delete(':id_imagen')
  remove(@Param('id_imagen', ParseIntPipe) id_imagen: number) {
    return this.galeriaService.remove(id_imagen);
  }
}
