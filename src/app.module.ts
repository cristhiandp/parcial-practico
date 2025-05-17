import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea/entities/aerolinea.entity';
import { Aeropuerto } from './aeropuerto/entities/aeropuerto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Aerolinea, Aeropuerto],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AerolineaModule,
    AeropuertoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
