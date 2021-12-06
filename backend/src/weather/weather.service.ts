import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { Weather } from './schema/weather.schema';
import { IWeather } from './interface/weather.interface';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(Weather.name) private readonly weatherModel: Model<IWeather>,
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

    public async findFavoritesByUserId(userId: string) {
        return this.weatherModel.find({ userId });
    }

    public async createFavoriteWeather(favorite: WeatherDto): Promise<IWeather> {
        if (await this.findFavoritesByUserId(favorite.userId)) {
            throw new Error('NO_SUCH_USER');
        }

        const createdFavorite = await this.weatherModel.create(favorite);
        return this.weatherModel.findById(createdFavorite._id);
    }
}
