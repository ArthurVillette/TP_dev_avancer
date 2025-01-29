import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private playerService: PlayerService,
    private eventEmitterService: EventEmitterService,
  ) {}

  async matchPlay(winner: string, loser: string, draw: boolean): Promise<void> {
    if (draw) {

    } else {
      const playerWinner = await this.playerRepository.findOne({ where: { id: winner } });
      const playerLoser = await this.playerRepository.findOne({ where: { id: loser } });
      if (playerWinner && playerLoser) {
        let Rh = playerWinner.rank;
        let Rl = playerLoser.rank;
        const probaAdversaire1 = 1 / (1 + Math.pow(10, (Rl - Rh) / 400));
        const probaAdversaire2= 1 / (1 + Math.pow(10, (Rh - Rl) / 400));
        
        await this.playerService.updateElo(playerWinner, 1, probaAdversaire1);
        await this.playerService.updateElo(playerLoser, 0, probaAdversaire2);
      }
    }
  }
}
