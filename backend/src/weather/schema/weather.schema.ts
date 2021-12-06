import { Schema } from 'mongoose';

export const WeatherSchema = new Schema({
  name: { type: String },
  userId: { type: String },
  weather: { type: String },
  temp: { type: Number },

  // Timestamps
  updatedAt: { type: Date, select: false },
  createdAt: { type: Date, select: false },
  __v: { type: Number, select: false },

}, { timestamps: true });

export const Weather = { name: 'Weather', schema: WeatherSchema };
