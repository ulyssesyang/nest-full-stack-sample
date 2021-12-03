import { Controller, Query, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    @Get('find')
    find(@Query('location') location: string) {
        return this.weatherService.findByLocation(location);
    }
}
