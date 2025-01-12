import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';

export enum Status {
  OPEN = 'Open',
  CLOSE = 'Close',
}

@Schema({
  timestamps: true,
})
export class Campaign {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  status: Status;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  end_date: Date;

  @Prop()
  user: User;

  @Prop({
    type: [{ email: String, status: String, username: String }],
  })
  influencers;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
