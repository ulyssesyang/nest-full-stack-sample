import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { WeatherController } from './weather/weather.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PasswordService } from './services/password/password.service';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

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
    AuthModule,
    UsersModule,
    WeatherModule,
    HttpModule,
  ],
  controllers: [
    AppController,
    UsersController,
    WeatherController
  ],
  providers: [
    AppService,
    PasswordService,
  ],
})
export class AppModule {}
