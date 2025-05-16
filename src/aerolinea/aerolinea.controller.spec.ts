import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaController } from './aerolinea.controller';
import { AerolineaService } from './aerolinea.service';
import { Aerolinea } from './entities/aerolinea.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Aeropuerto } from '../aeropuerto/entities/aeropuerto.entity';

describe('AerolineaController', () => {
  let controller: AerolineaController;
  let service: AerolineaService;
  let repository: Repository<Aerolinea>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      controllers: [AerolineaController],
      providers: [AerolineaService],
    }).compile();

    controller = module.get<AerolineaController>(AerolineaController);
    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<Aerolinea>>(
      getRepositoryToken(Aerolinea),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of airlines', async () => {
    const result = [new Aerolinea()];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('findOne should return a single airline', async () => {
    const result = new Aerolinea();
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('create should return a new airline', async () => {
    const aerolinea = new Aerolinea();
    jest.spyOn(service, 'create').mockResolvedValue(aerolinea);
    expect(await controller.create(aerolinea)).toBe(aerolinea);
  });

  it('update should update and return an airline', async () => {
    const aerolinea = new Aerolinea();
    jest.spyOn(service, 'update').mockResolvedValue(aerolinea);
    expect(await controller.update('1', aerolinea)).toBe(aerolinea);
  });

  it('delete should return undefined', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await controller.delete('1')).toBeUndefined();
  });
});
