import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, select: false })
  salt: string;

  @Prop({ type: Date, select: false })
  updatedAt: Date;

  @Prop({ type: Date, select: false })
  createdAt: Date;

  @Prop({ type: Number, select: false })
  _v: Number;
}

export const UsersSchema = SchemaFactory.createForClass(User);
