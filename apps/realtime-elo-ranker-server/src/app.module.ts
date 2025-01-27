import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingModule } from './ranking/ranking.module';
import { PlayerModule } from './player/player.module';
import { Player } from './player/player.entity';
import { Ranking } from './ranking/ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // Utilisez une base de données en mémoire pour le développement
      entities: [Player, Ranking],
      synchronize: true,
    }),
    RankingModule,
    PlayerModule,
  ],
})
export class AppModule {}
