import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { Influencer } from './schemas/influencer.schema';
import { CreateInfluencerDto } from './dto/create-influencer-dto';
import { UpdateInfluencerDto } from './dto/update-influencer-dto';
import mongoose from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('influencer')
export class InfluencerController {
  constructor(private influencerService: InfluencerService) {}

  @Get()
  async getAllInfluencers(): Promise<Influencer[]> {
    return this.influencerService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createInfluencer(
    @Body()
    Influencer: CreateInfluencerDto,
    @Req() req,
  ): Promise<Influencer> {
    return this.influencerService.create(Influencer, req.user);
  }

  @Get('/content/:email')
  @UseGuards(AuthGuard())
  async getInfluencer(
    @Param('email')
    email: string,
  ): Promise<Influencer[]> {
    const contents = this.influencerService.findByEmail(email);

    if (!contents) {
      throw new NotFoundException('contents not found.');
    }
    return contents;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateInfluencer(
    @Param('id')
    id: string,
    @Body()
    Influencer,
  ): Promise<Influencer> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    return this.influencerService.updatedById(id, Influencer);
  }
}
