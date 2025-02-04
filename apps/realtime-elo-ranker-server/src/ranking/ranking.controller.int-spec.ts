import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RankingController } from './ranking.controller';
import { PlayerService } from '../player/player.service';
import { EventEmitterService } from '../ranking/ranking-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';

describe('RankingController (integration)', () => {
  let app: INestApplication;
  let playerService: PlayerService;
  let eventEmitterService: EventEmitterService;

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
      controllers: [RankingController],
      providers: [PlayerService, EventEmitterService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    playerService = module.get<PlayerService>(PlayerService);
    eventEmitterService = module.get<EventEmitterService>(EventEmitterService);

    // Seed the database with initial players
    await playerService.seedPlayers();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/ranking/events (SSE)', (done) => {
    request(app.getHttpServer())
      .get('/api/ranking/events')
      .expect(200)
      .expect('Content-Type', /text\/event-stream/)
      .end((err, res) => {
        if (err) return done(err);
        res.on('data', (chunk) => {
          const data = chunk.toString();
          expect(data).toContain('event: message');
          expect(data).toContain('data:');
          done();
        });

        // Emit an event to trigger SSE
        eventEmitterService.MAJ({ key: 'value' });
      });
  }, 20000); // Augmenter le délai d'attente à 20 secondes
});
