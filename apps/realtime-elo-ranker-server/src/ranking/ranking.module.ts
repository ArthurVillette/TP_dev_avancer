import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { PlayerModule } from '../player/player.module';
import { RankingEventModule } from './ranking-event.module';

@Module({
  imports: [PlayerModule, RankingEventModule],
  controllers: [RankingController],
})
export class RankingModule {}
