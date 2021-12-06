import { createContext } from 'react';
import { Weather } from '../types/Weather';

export interface IWeatherContext {
  weather: Weather
}

export const WeatherContext = createContext<IWeatherContext>({} as IWeatherContext);