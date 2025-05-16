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
import { Aeropuerto } from './entities/aeropuerto.entity';

@Controller('airports')
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  @Get()
  async findAll() {
    return await this.aeropuertoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.aeropuertoService.findOne(id);
  }

  @Post()
  async create(@Body() aeropuerto: Aeropuerto) {
    return await this.aeropuertoService.create(aeropuerto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() aeropuerto: Aeropuerto) {
    return await this.aeropuertoService.update(id, aeropuerto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.aeropuertoService.delete(id);
  }
}
