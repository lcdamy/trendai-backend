import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../schemas/campaign.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsEnum(Status, { message: 'Please enter a valid campaign type' })
  readonly status: Status;

  @IsNotEmpty()
  @IsDate()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDate()
  readonly end_date: Date;

  @IsEmpty({ message: 'You can not pass user Id' })
  readonly user: User;

  @IsOptional()
  readonly influencers;
}
