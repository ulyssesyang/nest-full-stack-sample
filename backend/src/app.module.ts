import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, WeatherController],
  providers: [AppService, WeatherService],
})
export class AppModule {}
