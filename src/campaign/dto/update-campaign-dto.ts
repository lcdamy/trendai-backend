import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../schemas/campaign.schema';
import { User } from '../../auth/schemas/user.schema';

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  readonly image: string;
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsString()
  readonly status: Status;

  @IsOptional()
  @IsDate()
  readonly start_date: Date;

  @IsOptional()
  @IsDate()
  readonly end_date: Date;

  @IsEmpty({ message: 'You can not pass user Id' })
  readonly user: User;

  @IsOptional()
  readonly influencers;
}
