import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CalificacionesService } from './calificaciones.service';
import { Calificacione } from './entities/calificacione.entity';

describe('CalificacionesService', () => {
  let service: CalificacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalificacionesService,
        { provide: getRepositoryToken(Calificacione, 'mssql-connection'), useValue: {} },
      ],
    }).compile();

    service = module.get<CalificacionesService>(CalificacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
