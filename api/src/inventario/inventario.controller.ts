import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  create(@Body(new ValidationPipe()) createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  @Post('masivo')
  insertMasivo(@Body() lecturas: Inventario[]) {
    return this.inventarioService.insertMasivo(lecturas);
  }

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id_inventario')
  findOne(@Param('id_inventario', ParseIntPipe) id_inventario: number) {
    return this.inventarioService.findOne(id_inventario);
  }

  @Patch(':id_inventario')
  update(
    @Param('id_inventario', ParseIntPipe) id_inventario: number,
    @Body(new ValidationPipe()) updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventarioService.update(id_inventario, updateInventarioDto);
  }

  @Delete(':id_inventario')
  remove(@Param('id_inventario', ParseIntPipe) id_inventario: number) {
    return this.inventarioService.remove(id_inventario);
  }
}
