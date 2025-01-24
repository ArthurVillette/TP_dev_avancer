import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Promise<Ranking[]>;
    subscribeToRankingUpdates(): Promise<string>;
}
