import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepository: Repository<Player>;
  let eventEmitterService: EventEmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
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
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    eventEmitterService = module.get<EventEmitterService>(EventEmitterService);
  });

  it('should return all players', async () => {
    const players = [{ id: 'BOB', rank: 1200 }];
    (playerRepository.find as jest.Mock).mockResolvedValue(players);

    const result = await service.getAllPlayers();
    expect(result).toEqual(players);
  });

  it('should create a player', async () => {
    const playerData = { id: 'BOB', rank: 1200 };
    const player = { ...playerData, id: expect.any(String) };
    (playerRepository.create as jest.Mock).mockReturnValue(player);
    (playerRepository.save as jest.Mock).mockResolvedValue(player);

    const result = await service.createPlayer(playerData);
    expect(result).toEqual(player);
    expect(eventEmitterService.emit).toHaveBeenCalledWith('playerUpdated', player);
    expect(eventEmitterService.MAJ).toHaveBeenCalledWith(player);
  });

  it('should update player ELO', async () => {
    const player = { id: 'BOB', rank: 1200 };
    const updatedPlayer = { ...player, rank: 1532 };
    (playerRepository.save as jest.Mock).mockResolvedValue(updatedPlayer);

    const result = await service.updateElo(player, 1, 0.5);
    expect(result).toEqual(updatedPlayer);
    expect(eventEmitterService.emit).toHaveBeenCalledWith('playerUpdated', updatedPlayer);
    expect(eventEmitterService.MAJ).toHaveBeenCalledWith(updatedPlayer);
  });
});
