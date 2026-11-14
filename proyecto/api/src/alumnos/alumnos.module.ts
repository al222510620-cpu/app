import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { Alumno } from './entities/alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno], 'mssql-connection')],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
