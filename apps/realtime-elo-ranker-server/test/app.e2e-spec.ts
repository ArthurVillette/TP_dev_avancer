import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PlayerService } from './../src/player/player.service';

describe('RankingController (e2e)', () => {
  let app: INestApplication;
  let playerService: PlayerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    playerService = moduleFixture.get<PlayerService>(PlayerService);
    await app.init();

    // Initialiser les données
    await playerService.seedPlayers();
  });

  it('/api/ranking (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/ranking')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  
});
