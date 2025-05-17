import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { ActualizarAeropuertoDto, CrearAeropuertoDto } from './dtos';

@Controller('airports')
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  @Get()
  async findAll() {
    return this.aeropuertoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.aeropuertoService.findOne(id);
  }

  @Post()
  async create(@Body() aeropuerto: CrearAeropuertoDto) {
    return await this.aeropuertoService.create(aeropuerto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() aeropuerto: ActualizarAeropuertoDto,
  ) {
    return await this.aeropuertoService.update(id, aeropuerto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.aeropuertoService.delete(id);
  }
}
