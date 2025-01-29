import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
export declare class MatchService {
    private playerRepository;
    private playerService;
    private eventEmitterService;
    constructor(playerRepository: Repository<Player>, playerService: PlayerService, eventEmitterService: EventEmitterService);
    matchPlay(winner: string, loser: string, draw: boolean): Promise<void>;
}
