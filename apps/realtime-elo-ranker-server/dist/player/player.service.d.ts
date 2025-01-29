import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { EventEmitterService } from '../ranking/ranking-event.service';
export declare class PlayerService {
    private playerRepository;
    private eventEmitterService;
    constructor(playerRepository: Repository<Player>, eventEmitterService: EventEmitterService);
    getAllPlayers(): Promise<Player[]>;
    createPlayer(playerData: Partial<Player>): Promise<Player>;
    seedPlayers(): Promise<void>;
    updateElo(player: Player, resultat: number, proba: number): Promise<Player>;
}
