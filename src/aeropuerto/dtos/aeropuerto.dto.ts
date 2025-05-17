import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class CrearAeropuertoDto {
  @IsString()
  @Length(3, 3, {
    message: 'El código del aeropuerto debe tener exactamente 3 caracteres',
  })
  codigo: string;

  @IsString()
  @Length(1, 128, {
    message: 'El nombre del aeropuerto debe tener entre 1 y 128 caracteres',
  })
  nombre: string;

  @IsString()
  @Length(1, 128, {
    message: 'El país del aeropuerto debe tener entre 1 y 128 caracteres',
  })
  pais: string;

  @IsString()
  @Length(1, 128, {
    message: 'La ciudad del aeropuerto debe tener entre 1 y 128 caracteres',
  })
  ciudad: string;
}

export class ActualizarAeropuertoDto extends PartialType(CrearAeropuertoDto) {}
