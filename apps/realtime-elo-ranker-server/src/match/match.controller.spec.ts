import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from '../match/match.service';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';

describe('MatchController', () => {
  let controller: MatchController;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
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

    controller = module.get<MatchController>(MatchController);
    matchService = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
