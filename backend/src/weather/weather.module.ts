import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Weather, WeatherSchema } from './schema/weather.schema'

const Schemas = [{ name: Weather.name, schema: WeatherSchema }];

HttpModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    timeout: configService.getNumber('HTTP_TIMEOUT') || 5000,
    maxRedirects: configService.getNumber('HTTP_MAX_REDIRECTS') || 5,
  }),
  inject: [ConfigService],
});

@Module({
  imports: [MongooseModule.forFeature(Schemas), HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
