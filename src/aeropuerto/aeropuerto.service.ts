import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertoService {
  constructor(
    @InjectRepository(Aeropuerto)
    private readonly aeropuertoRepository: Repository<Aeropuerto>,
  ) {}

  async findAll(): Promise<Aeropuerto[]> {
    return await this.aeropuertoRepository.find({
      relations: ['aerolineas'],
    });
  }

  async findOne(id: string): Promise<Aeropuerto> {
    const aeropuerto = await this.aeropuertoRepository.findOne({
      where: { id },
      relations: ['aerolineas'],
    });

    if (!aeropuerto)
      throw new NotFoundException(`Aeropuerto con ID ${id} no encontrado`);

    return aeropuerto;
  }

  async create(aeropuerto: Aeropuerto): Promise<Aeropuerto> {
    if (aeropuerto.codigo.length !== 3) {
      throw new BadRequestException(
        'El código del aeropuerto debe tener exactamente 3 caracteres',
      );
    }

    const aeropuertoExistente = await this.aeropuertoRepository.findOne({
      where: { codigo: aeropuerto.codigo.toUpperCase() },
    });

    if (aeropuertoExistente) {
      throw new BadRequestException(
        `Ya existe un aeropuerto con el código ${aeropuerto.codigo}`,
      );
    }

    aeropuerto.codigo = aeropuerto.codigo.toUpperCase();

    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async update(id: string, aeropuerto: Aeropuerto): Promise<Aeropuerto> {
    const aeropuertoExistente = await this.findOne(id);

    if (aeropuerto.codigo && aeropuerto.codigo.length !== 3) {
      throw new BadRequestException(
        'El código del aeropuerto debe tener exactamente 3 caracteres',
      );
    }

    aeropuerto.codigo = aeropuerto.codigo.toUpperCase();

    const aeropuertoActualizado = {
      ...aeropuertoExistente,
      ...aeropuerto,
      id,
    };

    return await this.aeropuertoRepository.save(aeropuertoActualizado);
  }

  async delete(id: string) {
    const aeropuerto = await this.findOne(id);
    if (!aeropuerto) {
      throw new NotFoundException(`Aeropuerto con ID ${id} no encontrado`);
    }

    return await this.aeropuertoRepository.remove(aeropuerto);
  }
}
