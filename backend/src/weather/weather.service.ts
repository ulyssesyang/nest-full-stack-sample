import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs';

@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    public async findByLocation(location: string) {
        try {
            const openWeatherUrl = this.configService.getEnv('OPEN_WEATHER_URL');
            const openWeatherKey = this.configService.getEnv('OPEN_WEATHER_KEY');
            return this.httpService.get(`${openWeatherUrl}?q=${location}&appid=${openWeatherKey}`)
            .pipe(map((response: AxiosResponse) => response.data));
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
