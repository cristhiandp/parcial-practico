import { Module } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { AerolineaController } from './aerolinea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './entities/aerolinea.entity';
import { AeropuertoModule } from '../aeropuerto/aeropuerto.module';
import { AerolineaAeropuertoController } from './aerolinea-aeropuerto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aerolinea]), AeropuertoModule],
  providers: [AerolineaService],
  controllers: [AerolineaController, AerolineaAeropuertoController],
  exports: [AerolineaService],
})
export class AerolineaModule {}
