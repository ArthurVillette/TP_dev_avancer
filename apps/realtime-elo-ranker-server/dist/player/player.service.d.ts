import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    createPlayer(playerData: Partial<Player>): Promise<Player>;
    seedPlayers(): Promise<void>;
}
