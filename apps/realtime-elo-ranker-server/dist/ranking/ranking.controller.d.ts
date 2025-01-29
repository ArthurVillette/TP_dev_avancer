import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';
import { Observable } from 'rxjs';
import { EventEmitterService } from './ranking-event.service';
export declare class RankingController {
    private readonly playerService;
    private readonly eventEmitterService;
    constructor(playerService: PlayerService, eventEmitterService: EventEmitterService);
    getAllPlayers(): Promise<Player[]>;
    events(): Observable<any>;
}
