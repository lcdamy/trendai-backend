import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Social {
  TIKTOK = 'Tiktok',
  INSTAGRAM = 'Instagram',
}

export enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECT = 'Reject',
}

@Schema({
  timestamps: true,
})
export class Influencer {
  @Prop()
  content: string;

  @Prop()
  link: string;

  @Prop()
  social: Social;

  @Prop()
  status: Status;

  @Prop()
  user: User;
}

export const InfluencerSchema = SchemaFactory.createForClass(Influencer);
