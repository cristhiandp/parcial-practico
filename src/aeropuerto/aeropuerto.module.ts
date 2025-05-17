import { Module } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoController } from './aeropuerto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Aeropuerto])],
  providers: [AeropuertoService],
  controllers: [AeropuertoController],
  exports: [AeropuertoService],
})
export class AeropuertoModule {}
