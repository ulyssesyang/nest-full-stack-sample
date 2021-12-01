import { Controller, Get } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get()
  findByLocation(): string {
    return 'test';
  }
}
