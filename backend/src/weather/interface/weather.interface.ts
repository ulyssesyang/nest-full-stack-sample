import { Document } from 'mongoose';

export interface IWeather extends Document {
  name?: string;
  userId?: string;
  weather?: string;
  temp?: number;
}