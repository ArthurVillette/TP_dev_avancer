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
    const players = await this.playerRepository.find({ order: { rank: 'DESC' } });
    this.eventEmitterService.MAJ(players); 
    return players;

  }

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
      const player = this.playerRepository.create(playerData);
      const savedPlayer = await this.playerRepository.save(player);
      try {
        this.eventEmitterService.emit('playerUpdated', savedPlayer);
        this.eventEmitterService.MAJ(savedPlayer); // Passer les données du joueur
      } catch (error) {
        console.error('Error emitting event:', error);
      }
      return savedPlayer;}


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
    const newElo = Math.round(player.rank + 32 * (resultat - proba));
    player.rank = newElo;
    const updatedPlayer = await this.playerRepository.save(player);
    try {
      this.eventEmitterService.emit('playerUpdated', updatedPlayer);
      this.eventEmitterService.MAJ(updatedPlayer); // Passer les données du joueur
    } catch (error) {
      console.error('Error emitting event:', error);
    }
    return updatedPlayer;
  }
}
