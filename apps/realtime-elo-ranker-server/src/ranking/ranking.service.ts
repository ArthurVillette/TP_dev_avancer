import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
  ) {}

  async getRanking(): Promise<Ranking[]> {
    return this.rankingRepository.find({ relations: ['player'], order: { rank: 'ASC' } });
  }

  async subscribeToRankingUpdates(): Promise<string> {
    // Logique pour l'abonnement aux mises à jour du classement
    return 'Subscribed to ranking updates';
  }
}
