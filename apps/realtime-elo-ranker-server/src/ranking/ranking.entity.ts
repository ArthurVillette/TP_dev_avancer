import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player: Player) => player.id)
  player: Player;

  @Column()
  rank: number;

  @Column()
  elo: number;
}
