import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    getAllPlayers(): Promise<Player[]>;
    createPlayer(playerData: Partial<Player>): Promise<Player>;
    seedPlayers(): Promise<void>;
    updateElo(player: Player, resultat: number, proba: number): Promise<Player>;
}
