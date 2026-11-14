import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormulariosService } from './formularios.service';
import { FormulariosController } from './formularios.controller';
import { Formulario } from './entities/formulario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formulario], 'postgres-connection')],
  controllers: [FormulariosController],
  providers: [FormulariosService],
})
export class FormulariosModule {}
