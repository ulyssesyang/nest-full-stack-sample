import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  weather: string;

  @IsNotEmpty()
  @ApiProperty()
  temp: number;
}