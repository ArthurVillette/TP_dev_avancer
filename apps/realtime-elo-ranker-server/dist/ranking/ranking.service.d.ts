import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
export declare class RankingService {
    private rankingRepository;
    constructor(rankingRepository: Repository<Ranking>);
    getRanking(): Promise<Ranking[]>;
}
