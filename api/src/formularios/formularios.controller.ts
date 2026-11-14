import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';

@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  create(@Body(new ValidationPipe()) createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @Get()
  findAll() {
    return this.formulariosService.findAll();
  }

  @Delete(':id_formulario')
  remove(@Param('id_formulario', ParseIntPipe) id_formulario: number) {
    return this.formulariosService.remove(id_formulario);
  }
}
