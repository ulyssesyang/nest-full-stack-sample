import { Controller, Query, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findByLocation(@Query('location') location: string) {
        return this.weatherService.findByLocation(location);
    }

    @Get(':userId')
    @UseGuards(AuthGuard('jwt'))
    findFavoritesByUserId(@Param('userId') userId: string) {
        return this.weatherService.findFavoritesByUserId(userId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createFavoriteWeather(@Body() weatherDto: WeatherDto) {
        return this.weatherService.createFavoriteWeather(weatherDto);
    }
}
