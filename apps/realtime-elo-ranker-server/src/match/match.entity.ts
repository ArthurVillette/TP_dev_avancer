import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1: string;

  @Column()
  player2: string;

  @Column()
  score1: number;

  @Column()
  score2: number;

  @Column('datetime') // Utilisez 'datetime' au lieu de 'timestamp'
  date: Date;
}
