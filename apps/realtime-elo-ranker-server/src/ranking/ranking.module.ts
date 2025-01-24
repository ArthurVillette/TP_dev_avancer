import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { Ranking } from './ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  providers: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
