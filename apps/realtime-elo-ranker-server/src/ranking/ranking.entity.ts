import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Player, player => player.ranking)
  players: Player[];
}
