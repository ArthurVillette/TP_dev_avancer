import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { Player } from './player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // Utilisez une base de données en mémoire pour le développement
      entities: [Player],
      synchronize: true,
    }),
    PlayerModule,
    RankingModule,
  ],
})
export class AppModule {}
