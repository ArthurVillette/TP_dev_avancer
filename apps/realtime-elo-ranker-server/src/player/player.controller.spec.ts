import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';

describe('PlayerController', () => {
  let controller: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
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

    controller = module.get<PlayerController>(PlayerController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
