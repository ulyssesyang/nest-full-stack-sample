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
import { UsersService } from '../users/users.service';

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(Weather.name) private readonly weatherModel: Model<IWeather>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    public async findByLocation(location: string) {
        try {
            const openWeatherUrl = this.configService.getEnv('OPEN_WEATHER_URL');
            const openWeatherKey = this.configService.getEnv('OPEN_WEATHER_KEY');
            return this.httpService.get(`${openWeatherUrl}?q=${location}&appid=${openWeatherKey}`)
            .pipe(map((response: AxiosResponse) => {
                return {
                    name: response.data.name,
                    weather: response.data.weather[0]?.main,
                    temp: response.data.main?.temp,
                };
            }));
        } catch (error) {
            throw new BadRequestException();
        }
    }

    public async findFavoritesByUserId(userId: string) {
        return this.weatherModel.find({ userId });
    }

    public async createFavoriteWeather(favorite: WeatherDto): Promise<IWeather> {
        const user = await this.usersService.findById(favorite.userId);
        if (!user) {
            throw new Error('NO_SUCH_USER');
        }

        const createdFavorite = await this.weatherModel.create(favorite);
        return this.weatherModel.findById(createdFavorite._id);
    }
}
