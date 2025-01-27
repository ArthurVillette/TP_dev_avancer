import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking(): Promise<Ranking[]> {
    return this.rankingService.getRanking();
  }
}
