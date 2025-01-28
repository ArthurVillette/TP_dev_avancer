import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 1200 })
  rank: number;
;

}
