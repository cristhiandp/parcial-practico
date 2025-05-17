import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aerolinea } from './entities/aerolinea.entity';
import { Aeropuerto } from '../aeropuerto/entities/aeropuerto.entity';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(Aerolinea)
    private readonly aerolineaRepository: Repository<Aerolinea>,
    @InjectRepository(Aeropuerto)
    private readonly aeropuertoRepository: Repository<Aeropuerto>,
  ) {}

  async findAll(): Promise<Aerolinea[]> {
    return await this.aerolineaRepository.find({
      relations: ['aeropuertos'],
    });
  }

  async findOne(id: string): Promise<Aerolinea> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id },
      relations: ['aeropuertos'],
    });

    if (!aerolinea)
      throw new NotFoundException(`Aerolinea con ID ${id} no encontrada`);

    return aerolinea;
  }

  async create(aerolinea: Aerolinea): Promise<Aerolinea> {
    const today = new Date();
    const foundationDate = new Date(aerolinea.fechaFundacion);

    // Set time to midnight for both dates to compare just the dates
    today.setHours(0, 0, 0, 0);
    foundationDate.setHours(0, 0, 0, 0);

    // Ensure date is in the past by directly comparing
    if (foundationDate.getTime() > today.getTime()) {
      throw new BadRequestException(
        'La fecha de fundación debe ser en el pasado',
      );
    }

    return await this.aerolineaRepository.save(aerolinea);
  }

  async update(id: string, aerolinea: Aerolinea): Promise<Aerolinea> {
    const aerolineaExistente = await this.findOne(id);

    const today = new Date();
    const foundationDate = new Date(aerolinea.fechaFundacion);

    // Set time to midnight for both dates to compare just the dates
    today.setHours(0, 0, 0, 0);
    foundationDate.setHours(0, 0, 0, 0);

    // Ensure date is in the past by directly comparing
    if (foundationDate.getTime() > today.getTime()) {
      throw new BadRequestException(
        'La fecha de fundación debe ser en el pasado',
      );
    }

    const aerolineaActualizada = {
      ...aerolineaExistente,
      ...aerolinea,
      id,
    };

    return await this.aerolineaRepository.save(aerolineaActualizada);
  }

  async delete(id: string) {
    const aerolinea = await this.findOne(id);
    if (!aerolinea) {
      throw new NotFoundException(`Aerolinea con ID ${id} no encontrada`);
    }

    return await this.aerolineaRepository.remove(aerolinea);
  }

  async addAirportToAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<Aerolinea> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea) {
      throw new NotFoundException(
        `Aerolinea con ID ${aerolineaId} no encontrada`,
      );
    }

    const aeropuerto = await this.aeropuertoRepository.findOne({
      where: { id: aeropuertoId },
    });

    if (!aeropuerto) {
      throw new NotFoundException(
        `Aeropuerto con ID ${aeropuertoId} no encontrado`,
      );
    }

    // Verificar si el aeropuerto ya está asociado
    if (aerolinea.aeropuertos.some((a) => a.id === aeropuertoId)) {
      throw new BadRequestException(
        `El aeropuerto ya está asociado a la aerolínea`,
      );
    }

    aerolinea.aeropuertos.push(aeropuerto);
    return await this.aerolineaRepository.save(aerolinea);
  }

  async findAirportsFromAirline(aerolineaId: string): Promise<Aeropuerto[]> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea) {
      throw new NotFoundException(
        `Aerolinea con ID ${aerolineaId} no encontrada`,
      );
    }

    return aerolinea.aeropuertos;
  }

  async findAirportFromAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<Aeropuerto> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea) {
      throw new NotFoundException(
        `Aerolinea con ID ${aerolineaId} no encontrada`,
      );
    }

    const aeropuerto = aerolinea.aeropuertos.find((a) => a.id === aeropuertoId);

    if (!aeropuerto) {
      throw new NotFoundException(
        `Aeropuerto con ID ${aeropuertoId} no encontrado en la aerolínea ${aerolinea.nombre}`,
      );
    }

    return aeropuerto;
  }

  async updateAirportsFromAirline(
    aerolineaId: string,
    aeropuertoIds: string[],
  ): Promise<Aerolinea> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea) {
      throw new NotFoundException(
        `Aerolinea con ID ${aerolineaId} no encontrada`,
      );
    }

    const aeropuertos =
      await this.aeropuertoRepository.findByIds(aeropuertoIds);

    if (aeropuertos.length !== aeropuertoIds.length) {
      throw new BadRequestException(
        'Uno o más aeropuertos no fueron encontrados',
      );
    }

    aerolinea.aeropuertos = aeropuertos;
    return await this.aerolineaRepository.save(aerolinea);
  }

  async deleteAirportFromAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<Aerolinea> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea) {
      throw new NotFoundException(
        `Aerolinea con ID ${aerolineaId} no encontrada`,
      );
    }

    const aeropuertoIndex = aerolinea.aeropuertos.findIndex(
      (a) => a.id === aeropuertoId,
    );

    if (aeropuertoIndex === -1) {
      throw new NotFoundException(
        `Aeropuerto con ID ${aeropuertoId} no encontrado en la aerolínea ${aerolinea.nombre}`,
      );
    }

    aerolinea.aeropuertos.splice(aeropuertoIndex, 1);
    return await this.aerolineaRepository.save(aerolinea);
  }
}
