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

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
    const player = this.playerRepository.create(playerData);
    return this.playerRepository.save(player);
  }

  

  async seedPlayers(): Promise<void> {
    const players = [
      { id: 'Arthur', rank: 1200 },
      { id: 'burito', rank: 1200},
      // Ajoutez d'autres joueurs ici
    ];

    for (const playerData of players) {
      await this.createPlayer(playerData);
    }
  }
  
}
