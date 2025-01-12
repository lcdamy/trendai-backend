import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Influencer } from './schemas/influencer.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class InfluencerService {
  constructor(
    @InjectModel(Influencer.name)
    private influencerModel: mongoose.Model<Influencer>,
  ) {}

  async findAll(): Promise<Influencer[]> {
    const influencers = await this.influencerModel.find();
    return influencers;
  }

  async create(influencer: Influencer, user: User): Promise<Influencer> {
    return await this.influencerModel.create({
      ...influencer,
      content: `${influencer.social}: ${influencer.link}`,
      status: 'Pending',
      user: user,
    });
  }

  async findByEmail(email: string): Promise<Influencer[]> {
    return await this.influencerModel.find({ 'user.email': email });
  }

  async updatedById(id: string, influencer: Influencer): Promise<Influencer> {
    return await this.influencerModel.findByIdAndUpdate(id, influencer, {
      new: true,
      runValidators: true,
    });
  }
}
