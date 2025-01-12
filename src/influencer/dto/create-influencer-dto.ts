import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Social, Status } from '../schemas/influencer.schema';
import { User } from 'src/auth/schemas/user.schema';

export class CreateInfluencerDto {
  @IsOptional()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @IsNotEmpty()
  @IsString()
  readonly social: Social;

  @IsOptional()
  @IsString()
  readonly status: Status;

  @IsEmpty({ message: 'You can not pass user Id' })
  readonly user: User;
}
