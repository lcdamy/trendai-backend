import { Module } from '@nestjs/common';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InfluencerSchema } from './schemas/influencer.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Influencer', schema: InfluencerSchema },
    ]),
  ],
  controllers: [InfluencerController],
  providers: [InfluencerService],
})
export class InfluencerModule {}
