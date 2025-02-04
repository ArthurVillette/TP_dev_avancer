import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PlayerService (integration)', () => {
  let service: PlayerService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Player],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Player]),
      ],
      providers: [
        PlayerService,
        EventEmitterService,
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));

    // Seed the database with initial players
    await playerRepository.save([
      { id: 'BOB', rank: 1500 },
      { id: 'Michel', rank: 1400 },
    ]);
  });

  it('should return all players', async () => {
    const players = await service.getAllPlayers();
    expect(players).toHaveLength(2);
  });

  it('should create a player', async () => {
    const playerData = { id: 'DUPOND', rank: 1300 };
    const player = await service.createPlayer(playerData);
    expect(player).toHaveProperty('id', 'DUPOND');
    expect(player).toHaveProperty('rank', 1300);
  });

  it('should update player ELO', async () => {
    const player = await playerRepository.findOne({ where: { id: 'BOB' } });
    if (player) {
      const updatedPlayer = await service.updateElo(player, 1, 0.5);
      expect(updatedPlayer.rank).toBeGreaterThan(1500);
  }  });
});
