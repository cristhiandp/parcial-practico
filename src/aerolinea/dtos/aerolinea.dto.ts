import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxDate,
} from 'class-validator';

export class CrearAerolineaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsDate()
  @MaxDate(new Date())
  fechaFundacion: Date;

  @IsString()
  @IsNotEmpty()
  paginaWeb: string;
}

export class ActualizarAerolineaDto extends PartialType(CrearAerolineaDto) {}
