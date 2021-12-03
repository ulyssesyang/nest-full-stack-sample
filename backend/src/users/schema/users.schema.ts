import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
  name: { type: String },
  email: { type: String },

  // Private Fields
  password: { type: String, select: false },
  salt: { type: String, select: false },

  // Timestamps
  updatedAt: { type: Date, select: false },
  createdAt: { type: Date, select: false },
  __v: { type: Number, select: false },

}, { timestamps: true });

export const User = { name: 'Users', schema: UsersSchema };
