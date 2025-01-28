import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';
export declare class RankingController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getAllPlayers(): Promise<Player[]>;
}
