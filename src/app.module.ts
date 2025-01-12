import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluencerModule } from './influencer/influencer.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    InfluencerModule,
    AuthModule,
    CampaignModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to the public folder
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
