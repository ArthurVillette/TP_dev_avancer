import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { EventEmitterService } from '../ranking/ranking-event.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eventEmitterService: EventEmitterService,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
    const player = this.playerRepository.create(playerData);
    const savedPlayer = await this.playerRepository.save(player);
    this.eventEmitterService.emit('playerCreated', savedPlayer);
    this.eventEmitterService.MAJ(); // Émettre l'événement ranking.update
    return savedPlayer;
  }

  async seedPlayers(): Promise<void> {
    const players = [
      { id: 'Arthur', rank: 1850 },
      { id: 'burito', rank: 1200 },
      { id: 'Magnus Carlsen', rank: 2850 },
      { id: 'Hugo', rank: 1000 },
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
    const updatedPlayer = await this.playerRepository.save(player);
    this.eventEmitterService.emit('playerUpdated', updatedPlayer);
    this.eventEmitterService.MAJ(); // Émettre l'événement ranking.update
    return updatedPlayer;
  }
}
