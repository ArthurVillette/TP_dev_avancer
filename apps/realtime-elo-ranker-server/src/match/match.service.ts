import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity'
import { PlayerService } from '../player/player.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PlayerService)
    private PlayerService:PlayerService,
  ) {}

  async createMatch(matchData: Partial<Match>): Promise<Match> {
    const match = this.matchRepository.create(matchData);
    return this.matchRepository.save(match);
  }

  async matchPlay(winner:string,loser:string,draw:boolean): Promise<void> {
    if (draw){

    }
    else{
      const playerWinner: Player | null = await this.playerRepository.findOne({ where: { id: winner } });
      const playerLoser: Player | null = await this.playerRepository.findOne({ where: { id: loser } });
      if(playerWinner&&playerLoser){
      let Rh: number = playerWinner.rank;
      let Rl = playerLoser.rank;
      const proba = 1 / (1 + Math.pow(10, (Rl - Rh) / 400));
      this.PlayerService.updateElo(playerWinner,1,proba)
      this.PlayerService.updateElo(playerLoser,0,proba)
      }
    }
  }

  
}
