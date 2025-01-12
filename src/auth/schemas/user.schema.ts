import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Type {
  INFLUENCER = 'Influencer',
  BRAND = 'Brand',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  image_url: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  type: Type;
}

export const UserSchema = SchemaFactory.createForClass(User);
