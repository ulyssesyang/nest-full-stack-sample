import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PasswordService } from './services/password/password.service';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';

const MongooseConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.getEnv('MONGODB_URI'),
  }),
};

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync(MongooseConfig),
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    WeatherModule
  ],
  controllers: [
    AppController,
    UsersController,
    WeatherController
  ],
  providers: [
    AppService,
    WeatherService,
    PasswordService,
  ],
})
export class AppModule {}
