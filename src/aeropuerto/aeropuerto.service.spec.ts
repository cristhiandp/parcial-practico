import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AeropuertoService } from './aeropuerto.service';
import { Aeropuerto } from './entities/aeropuerto.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repository: Repository<Aeropuerto>;
  let aeropuertoList: Aeropuerto[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<Aeropuerto>>(
      getRepositoryToken(Aeropuerto),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    aeropuertoList = [];
    for (let i = 0; i < 5; i++) {
      const aeropuerto = new Aeropuerto();
      aeropuerto.nombre = `Aeropuerto ${i}`;
      aeropuerto.codigo = `AP${i}`;
      aeropuerto.pais = `País ${i}`;
      aeropuerto.ciudad = `Ciudad ${i}`;
      const savedAeropuerto = await repository.save(aeropuerto);
      aeropuertoList.push(savedAeropuerto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all airports', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(aeropuertoList.length);
  });

  it('findOne should return a airport by id', async () => {
    const storedAeropuerto = aeropuertoList[0];
    const aeropuerto = await service.findOne(storedAeropuerto.id);
    expect(aeropuerto).not.toBeNull();
    expect(aeropuerto.codigo).toEqual(storedAeropuerto.codigo);
  });

  it('findOne should throw an exception for an invalid airport', async () => {
    await expect(() => service.findOne('0')).rejects.toThrow(NotFoundException);
  });

  it('create should return a new airport', async () => {
    const aeropuerto = new Aeropuerto();
    aeropuerto.nombre = 'Nuevo Aeropuerto';
    aeropuerto.codigo = 'NAP';
    aeropuerto.pais = 'Nuevo País';
    aeropuerto.ciudad = 'Nueva Ciudad';

    const result = await service.create(aeropuerto);
    expect(result).not.toBeNull();
    expect(result.codigo).toEqual('NAP');
  });

  it('create should throw an exception for invalid code length', async () => {
    const aeropuerto = new Aeropuerto();
    aeropuerto.nombre = 'Nuevo Aeropuerto';
    aeropuerto.codigo = 'NAPX'; // Código de 4 caracteres
    aeropuerto.pais = 'Nuevo País';
    aeropuerto.ciudad = 'Nueva Ciudad';

    await expect(() => service.create(aeropuerto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('update should modify a airport', async () => {
    const aeropuerto = aeropuertoList[0];
    aeropuerto.nombre = 'Nuevo nombre';
    const updatedAeropuerto = await service.update(aeropuerto.id, aeropuerto);
    expect(updatedAeropuerto).not.toBeNull();
    expect(updatedAeropuerto.nombre).toEqual('Nuevo nombre');
  });

  it('update should throw an exception for invalid code length', async () => {
    const aeropuerto = aeropuertoList[0];
    aeropuerto.codigo = 'NAPX'; // Código de 4 caracteres
    await expect(() =>
      service.update(aeropuerto.id, aeropuerto),
    ).rejects.toThrow(BadRequestException);
  });

  it('update should throw an exception for an invalid airport', async () => {
    let aeropuerto = aeropuertoList[0];
    aeropuerto = {
      ...aeropuerto,
      nombre: 'Nuevo nombre',
    };
    await expect(() => service.update('0', aeropuerto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete should remove a airport', async () => {
    const aeropuerto = aeropuertoList[0];
    await service.delete(aeropuerto.id);
    await expect(() => service.findOne(aeropuerto.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete should throw an exception for an invalid airport', async () => {
    await expect(() => service.delete('0')).rejects.toThrow(NotFoundException);
  });
});
