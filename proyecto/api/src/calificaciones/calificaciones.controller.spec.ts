import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CalificacionesController } from './calificaciones.controller';
import { CalificacionesService } from './calificaciones.service';
import { Calificacione } from './entities/calificacione.entity';

describe('CalificacionesController', () => {
  let controller: CalificacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalificacionesController],
      providers: [
        CalificacionesService,
        { provide: getRepositoryToken(Calificacione, 'mssql-connection'), useValue: {} },
      ],
    }).compile();

    controller = module.get<CalificacionesController>(CalificacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
