import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // Utilisez une base de données en mémoire pour le développement
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MatchModule,
    PlayerModule,
    RankingModule,
  ],
})
export class AppModule {}
