import { Repository } from 'typeorm';
import { Match } from './match.entity';
export declare class MatchService {
    private matchRepository;
    constructor(matchRepository: Repository<Match>);
    createMatch(matchData: Partial<Match>): Promise<Match>;
}
