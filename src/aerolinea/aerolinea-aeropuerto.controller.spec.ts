import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaAeropuertoController } from './aerolinea-aeropuerto.controller';
import { AerolineaService } from './aerolinea.service';
import { Aeropuerto } from '../aeropuerto/entities/aeropuerto.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Aerolinea } from './entities/aerolinea.entity';

describe('AerolineaAeropuertoController', () => {
  let controller: AerolineaAeropuertoController;
  let service: AerolineaService;
  let aerolineaRepository: Repository<Aerolinea>;
  let aeropuertoRepository: Repository<Aeropuerto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      controllers: [AerolineaAeropuertoController],
      providers: [AerolineaService],
    }).compile();

    controller = module.get<AerolineaAeropuertoController>(
      AerolineaAeropuertoController,
    );
    service = module.get<AerolineaService>(AerolineaService);
    aerolineaRepository = module.get<Repository<Aerolinea>>(
      getRepositoryToken(Aerolinea),
    );
    aeropuertoRepository = module.get<Repository<Aeropuerto>>(
      getRepositoryToken(Aeropuerto),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('addAirportToAirline should add an airport to an airline', async () => {
    const result = new Aerolinea();
    jest.spyOn(service, 'addAirportToAirline').mockResolvedValue(result);
    expect(await controller.addAirportToAirline('1', '1')).toBe(result);
  });

  it('findAirportsFromAirline should return airports from an airline', async () => {
    const result = [new Aeropuerto()];
    jest.spyOn(service, 'findAirportsFromAirline').mockResolvedValue(result);
    expect(await controller.findAirportsFromAirline('1')).toBe(result);
  });

  it('findAirportFromAirline should return a specific airport from an airline', async () => {
    const result = new Aeropuerto();
    jest.spyOn(service, 'findAirportFromAirline').mockResolvedValue(result);
    expect(await controller.findAirportFromAirline('1', '1')).toBe(result);
  });

  it('updateAirportsFromAirline should update airports of an airline', async () => {
    const result = new Aerolinea();
    const airportIds = ['1', '2'];
    jest.spyOn(service, 'updateAirportsFromAirline').mockResolvedValue(result);
    expect(await controller.updateAirportsFromAirline('1', airportIds)).toBe(
      result,
    );
  });

  it('deleteAirportFromAirline should remove an airport from an airline', async () => {
    const result = new Aerolinea();
    jest.spyOn(service, 'deleteAirportFromAirline').mockResolvedValue(result);
    expect(await controller.deleteAirportFromAirline('1', '1')).toBe(result);
  });
});
