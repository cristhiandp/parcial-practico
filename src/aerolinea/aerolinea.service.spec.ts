import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaService } from './aerolinea.service';
import { Aerolinea } from './entities/aerolinea.entity';
import { Aeropuerto } from '../aeropuerto/entities/aeropuerto.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repository: Repository<Aerolinea>;
  let aeropuertoRepository: Repository<Aeropuerto>;
  let aerolineaList: Aerolinea[];
  let aeropuertoList: Aeropuerto[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<Aerolinea>>(
      getRepositoryToken(Aerolinea),
    );
    aeropuertoRepository = module.get<Repository<Aeropuerto>>(
      getRepositoryToken(Aeropuerto),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    aeropuertoRepository.clear();
    aerolineaList = [];
    aeropuertoList = [];

    for (let i = 0; i < 5; i++) {
      const aerolinea = new Aerolinea();
      aerolinea.nombre = `Aerolinea ${i}`;
      aerolinea.descripcion = `Descripción ${i}`;
      aerolinea.fechaFundacion = new Date('2000-01-01');
      aerolinea.paginaWeb = `www.aerolinea${i}.com`;
      const savedAerolinea = await repository.save(aerolinea);
      aerolineaList.push(savedAerolinea);
    }

    for (let i = 0; i < 5; i++) {
      const aeropuerto = new Aeropuerto();
      aeropuerto.nombre = `Aeropuerto ${i}`;
      aeropuerto.codigo = `AP${i}`;
      aeropuerto.pais = `País ${i}`;
      aeropuerto.ciudad = `Ciudad ${i}`;
      const savedAeropuerto = await aeropuertoRepository.save(aeropuerto);
      aeropuertoList.push(savedAeropuerto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all airlines', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(aerolineaList.length);
  });

  it('findOne should return a airline by id', async () => {
    const storedAerolinea = aerolineaList[0];
    const aerolinea = await service.findOne(storedAerolinea.id);
    expect(aerolinea).not.toBeNull();
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
  });

  it('findOne should throw an exception for an invalid airline', async () => {
    await expect(() => service.findOne('0')).rejects.toThrow(NotFoundException);
  });

  it('create should return a new airline', async () => {
    const aerolinea = new Aerolinea();
    aerolinea.nombre = 'Nueva Aerolinea';
    aerolinea.descripcion = 'Nueva Descripción';
    aerolinea.fechaFundacion = new Date('2000-01-01');
    aerolinea.paginaWeb = 'www.nueva.com';

    const result = await service.create(aerolinea);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual('Nueva Aerolinea');
  });

  it('create should throw an exception for a future foundation date', async () => {
    const aerolinea = new Aerolinea();
    aerolinea.nombre = 'Nueva Aerolinea';
    aerolinea.descripcion = 'Nueva Descripción';
    aerolinea.fechaFundacion = new Date('2025-01-01');
    aerolinea.paginaWeb = 'www.nueva.com';

    await expect(() => service.create(aerolinea)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('update should modify a airline', async () => {
    const aerolinea = aerolineaList[0];
    aerolinea.nombre = 'Nuevo nombre';
    const updatedAerolinea = await service.update(aerolinea.id, aerolinea);
    expect(updatedAerolinea).not.toBeNull();
    expect(updatedAerolinea.nombre).toEqual('Nuevo nombre');
  });

  it('update should throw an exception for an invalid airline', async () => {
    let aerolinea = aerolineaList[0];
    aerolinea = {
      ...aerolinea,
      nombre: 'Nuevo nombre',
    };
    await expect(() => service.update('0', aerolinea)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete should remove a airline', async () => {
    const aerolinea = aerolineaList[0];
    await service.delete(aerolinea.id);
    await expect(() => service.findOne(aerolinea.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete should throw an exception for an invalid airline', async () => {
    await expect(() => service.delete('0')).rejects.toThrow(NotFoundException);
  });

  // Pruebas para la asociación con aeropuertos

  it('addAirportToAirline should add an airport to a airline', async () => {
    const result = await service.addAirportToAirline(
      aerolineaList[0].id,
      aeropuertoList[0].id,
    );
    expect(result.aeropuertos).toHaveLength(1);
    expect(result.aeropuertos[0].id).toEqual(aeropuertoList[0].id);
  });

  it('findAirportsFromAirline should return airports by airline', async () => {
    const aerolinea = aerolineaList[0];
    await service.addAirportToAirline(aerolinea.id, aeropuertoList[0].id);
    const result = await service.findAirportsFromAirline(aerolinea.id);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(aeropuertoList[0].id);
  });

  it('findAirportFromAirline should return a specific airport from a airline', async () => {
    const aerolinea = aerolineaList[0];
    await service.addAirportToAirline(aerolinea.id, aeropuertoList[0].id);
    const result = await service.findAirportFromAirline(
      aerolinea.id,
      aeropuertoList[0].id,
    );
    expect(result).not.toBeNull();
    expect(result.id).toEqual(aeropuertoList[0].id);
  });

  it('updateAirportsFromAirline should update airports list', async () => {
    const aerolinea = aerolineaList[0];
    const result = await service.updateAirportsFromAirline(aerolinea.id, [
      aeropuertoList[0].id,
      aeropuertoList[1].id,
    ]);
    expect(result.aeropuertos).toHaveLength(2);
  });

  it('deleteAirportFromAirline should remove an airport from a airline', async () => {
    const aerolinea = aerolineaList[0];
    await service.addAirportToAirline(aerolinea.id, aeropuertoList[0].id);
    const result = await service.deleteAirportFromAirline(
      aerolinea.id,
      aeropuertoList[0].id,
    );
    expect(result.aeropuertos).toHaveLength(0);
  });
});
