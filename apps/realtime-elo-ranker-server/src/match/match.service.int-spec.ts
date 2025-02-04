import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MatchService (integration)', () => {
  let service: MatchService;
  let playerService: PlayerService;
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
        MatchService,
        PlayerService,
        EventEmitterService,
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));

    // Seed the database with initial players
    await playerRepository.save([
      { id: 'winner', rank: 1500 },
      { id: 'loser', rank: 1400 },
    ]);
  });

  it('should update player ranks after a match', async () => {
    await service.matchPlay('winner', 'loser', false);

    const winner = await playerRepository.findOne({ where: { id: 'winner' } });
    const loser = await playerRepository.findOne({ where: { id: 'loser' } });

    if(winner&&loser){
    expect(winner.rank).toBeGreaterThan(1500);
    expect(loser.rank).toBeLessThan(1400);}
  });
});
