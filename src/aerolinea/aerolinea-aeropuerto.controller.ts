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

@Controller('airlines')
export class AerolineaAeropuertoController {
  constructor(private readonly aerolineaService: AerolineaService) {}

  @Post(':airlineId/airports/:airportId')
  async addAirportToAirline(
    @Param('airlineId') airlineId: string,
    @Param('airportId') airportId: string,
  ) {
    return await this.aerolineaService.addAirportToAirline(
      airlineId,
      airportId,
    );
  }

  @Get(':airlineId/airports')
  async findAirportsFromAirline(@Param('airlineId') airlineId: string) {
    return await this.aerolineaService.findAirportsFromAirline(airlineId);
  }

  @Get(':airlineId/airports/:airportId')
  async findAirportFromAirline(
    @Param('airlineId') airlineId: string,
    @Param('airportId') airportId: string,
  ) {
    return await this.aerolineaService.findAirportFromAirline(
      airlineId,
      airportId,
    );
  }

  @Put(':airlineId/airports')
  async updateAirportsFromAirline(
    @Param('airlineId') airlineId: string,
    @Body() airportIds: string[],
  ) {
    return await this.aerolineaService.updateAirportsFromAirline(
      airlineId,
      airportIds,
    );
  }

  @Delete(':airlineId/airports/:airportId')
  @HttpCode(204)
  async deleteAirportFromAirline(
    @Param('airlineId') airlineId: string,
    @Param('airportId') airportId: string,
  ) {
    return await this.aerolineaService.deleteAirportFromAirline(
      airlineId,
      airportId,
    );
  }
}
