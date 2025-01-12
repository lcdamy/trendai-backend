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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign } from './schemas/campaign.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateCampaignDto } from './dto/create-campaign-dto';
import mongoose from 'mongoose';
import { UpdateCampaignDto } from './dto/update-campaign-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('campaign')
export class CampaignController {
  constructor(private campaign: CampaignService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllCampaigns(): Promise<Campaign[]> {
    return this.campaign.findAll();
  }

  @Get('/influencer')
  @UseGuards(AuthGuard())
  async getAllCampaignsInfluencer(@Req() req): Promise<Campaign[]> {
    return this.campaign.findAllByInfluencer(req.user.email);
  }

  @Get('/brand')
  @UseGuards(AuthGuard())
  async getAllCampaignsbrand(@Req() req): Promise<Campaign[]> {
    return this.campaign.findAllByEmail(req.user.email);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async createCampaign(
    @UploadedFile() file,
    @Body() campaign,
    @Req() req,
    @Headers('host') host: string,
  ): Promise<Campaign> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.campaign.create(
      JSON.parse(campaign.data),
      req.user,
      file,
      host,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getCampaign(
    @Param('id')
    id: string,
  ): Promise<Campaign> {
    const campaign = this.campaign.findById(id);

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }

    if (!campaign) {
      throw new NotFoundException('Campaign not found.');
    }
    return campaign;
  }

  @Put('/join/:id')
  @UseGuards(AuthGuard())
  async updateCampaign(
    @Param('id')
    id: string,
    @Body()
    Campaign: UpdateCampaignDto,
    @Req() req,
  ): Promise<Campaign> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    const updated = this.campaign.updatedById(id, Campaign);
    if (!updated) {
      throw new NotFoundException('Campaign not updated.');
    }
    return updated;
  }
}
