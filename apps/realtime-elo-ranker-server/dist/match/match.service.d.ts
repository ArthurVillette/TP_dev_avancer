import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';
import { PlayerService } from '../player/player.service';
export declare class MatchService {
    private matchRepository;
    private playerRepository;
    private PlayerService;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>, PlayerService: PlayerService);
    createMatch(matchData: Partial<Match>): Promise<Match>;
    matchPlay(winner: string, loser: string, draw: boolean): Promise<void>;
}
