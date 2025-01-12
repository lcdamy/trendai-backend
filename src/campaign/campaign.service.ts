import { Injectable } from '@nestjs/common';
import { Campaign } from './schemas/campaign.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { extname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: mongoose.Model<Campaign>,
  ) {}

  async findAll(): Promise<Campaign[]> {
    const campaigns = await this.campaignModel.find();
    return campaigns;
  }

  async findAllByInfluencer(email: string): Promise<Campaign[]> {
    const campaigns = await this.campaignModel.find();
    const updated_campain = campaigns.map((i: any) => {
      const is_joined = i.influencers.find((x) => x.email === email);
      i.status = is_joined ? 'Approved' : 'Pending';
      return i;
    });
    return updated_campain;
  }

  async create(campaign: Campaign, user: User, file, host): Promise<Campaign> {
    const uploadFolder = join('public', 'uploads'); // Define the folder path.

    if (!existsSync(uploadFolder)) {
      mkdirSync(uploadFolder, { recursive: true });
    }
    const timestamp = Date.now();
    const fileExtension = extname(file.originalname); // Extract the file extension
    const newFileName = `${timestamp}${fileExtension}`;

    const filePath = join(uploadFolder, newFileName);

    writeFileSync(filePath, file.buffer);

    const save_path = join('uploads', newFileName);

    campaign.image = `http://${host}/${save_path}`;

    return await this.campaignModel.create({ ...campaign, user: user });
  }

  async findById(id: string): Promise<Campaign> {
    return await this.campaignModel.findById(id);
  }

  async findAllByEmail(email: string) {
    return await this.campaignModel.find({ 'user.email': email });
  }

  async updatedById(id: string, influencer): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(id);
    // const influencer_info = await this.userModel.findOne({
    //   email: influencer.email,
    // });
    // console.log(influencer_info);

    if (
      campaign &&
      !campaign.influencers.find((x) => x.email === influencer.email)
    ) {
      campaign.influencers.push(influencer);
    }
    return await this.campaignModel.findByIdAndUpdate(id, campaign);
  }
}
