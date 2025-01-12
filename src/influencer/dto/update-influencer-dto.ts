import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateInfluencerDto {
  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly followers: string;

  @IsEmpty({ message: 'You can not pass user Id' })
  readonly user: User;
}
