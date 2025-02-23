import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';

describe('MatchService', () => {
  let service: MatchService;
  let playerService: PlayerService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: PlayerService,
          useValue: {
            updateElo: jest.fn(),
          },
        },
        {
          provide: EventEmitterService,
          useValue: {
            emit: jest.fn(),
            MAJ: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Player),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should update player ranks after a match', async () => {
    const winner = { id: 'winner', rank: 1500 };
    const loser = { id: 'loser', rank: 1400 };

    (playerRepository.findOne as jest.Mock).mockResolvedValueOnce(winner);
    (playerRepository.findOne as jest.Mock).mockResolvedValueOnce(loser);

    await service.matchPlay('winner', 'loser', false);

    expect(playerService.updateElo).toHaveBeenCalledWith(winner, 1, expect.any(Number));
    expect(playerService.updateElo).toHaveBeenCalledWith(loser, 0, expect.any(Number));
  });
});
