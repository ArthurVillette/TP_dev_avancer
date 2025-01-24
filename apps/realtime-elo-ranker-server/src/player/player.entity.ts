import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rank: number;

  @Column()
  matchesPlayed: number;

  @Column()
  matchesWon: number;
}
