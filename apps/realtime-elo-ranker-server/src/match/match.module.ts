import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Player } from '../player/player.entity';
import { PlayerModule } from '../player/player.module';
import { RankingEventModule } from '../ranking/ranking-event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), PlayerModule, RankingEventModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
