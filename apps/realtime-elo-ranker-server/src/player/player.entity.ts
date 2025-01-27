import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ranking } from '../ranking/ranking.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 1200 })
  rank: number;

  @ManyToOne(() => Ranking, ranking => ranking.players)
  ranking: Ranking;

}
