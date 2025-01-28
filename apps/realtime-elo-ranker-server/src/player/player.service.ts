import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
    const player = this.playerRepository.create(playerData);
    return this.playerRepository.save(player);
  }

  async seedPlayers(): Promise<void> {
    const players = [
      { id: 'Arthur', rank: 1850 },
      { id: 'burito', rank: 1200},
      { id: 'Magnus Carlsen', rank: 2850},
      { id: 'Hugo', rank: 1000},

    ];

    for (const playerData of players) {
      await this.createPlayer(playerData);
    }
  }

 async updateElo(player: Player, resultat: number, proba: number): Promise<Player> {
    if (!player) {
      throw new Error('Player not found');
    }
    const newElo = player.rank + 32 * (resultat - proba);
    player.rank = newElo;
    return this.playerRepository.save(player);
  }

}
