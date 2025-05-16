import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoController } from './aeropuerto.controller';
import { AeropuertoService } from './aeropuerto.service';
import { Aeropuerto } from './entities/aeropuerto.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AeropuertoController', () => {
  let controller: AeropuertoController;
  let service: AeropuertoService;
  let repository: Repository<Aeropuerto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      controllers: [AeropuertoController],
      providers: [AeropuertoService],
    }).compile();

    controller = module.get<AeropuertoController>(AeropuertoController);
    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<Aeropuerto>>(
      getRepositoryToken(Aeropuerto),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of airports', async () => {
    const result = [new Aeropuerto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('findOne should return a single airport', async () => {
    const result = new Aeropuerto();
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('create should return a new airport', async () => {
    const aeropuerto = new Aeropuerto();
    jest.spyOn(service, 'create').mockResolvedValue(aeropuerto);
    expect(await controller.create(aeropuerto)).toBe(aeropuerto);
  });

  it('update should update and return an airport', async () => {
    const aeropuerto = new Aeropuerto();
    jest.spyOn(service, 'update').mockResolvedValue(aeropuerto);
    expect(await controller.update('1', aeropuerto)).toBe(aeropuerto);
  });

  it('delete should return undefined', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await controller.delete('1')).toBeUndefined();
  });
});
