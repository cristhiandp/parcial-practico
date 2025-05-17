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
import { AerolineaService } from './aerolinea.service';
import { ActualizarAerolineaDto, CrearAerolineaDto } from './dtos';

@Controller('airlines')
export class AerolineaController {
  constructor(private readonly aerolineaService: AerolineaService) {}

  @Get()
  async findAll() {
    return await this.aerolineaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.aerolineaService.findOne(id);
  }

  @Post()
  async create(@Body() aerolinea: CrearAerolineaDto) {
    return await this.aerolineaService.create(aerolinea);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() aerolinea: ActualizarAerolineaDto,
  ) {
    return this.aerolineaService.update(id, aerolinea);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.aerolineaService.delete(id);
  }
}
