import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { Player } from './player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', 
      entities: [Player],
      synchronize: true,
    }),
    PlayerModule,
    RankingModule,
    MatchModule,
  ],
})
export class AppModule {}
