import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { Calificacione } from './entities/calificacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacione], 'mssql-connection')],
  controllers: [CalificacionesController],
  providers: [CalificacionesService],
})
export class CalificacionesModule {}
