import { Routes } from 'nest-router';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },

      { path: '/weather', module: WeatherModule },

      { path: '/users', module: UsersModule },
    ],
  },
];
