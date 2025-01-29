import { Controller, Get, Sse } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';
import { Observable } from 'rxjs';
import { EventEmitterService } from './ranking-event.service';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Sse('events')
  events(): Observable<any> {
    return new Observable((observer) => {
      const rankingUpdateListener = (data: any) => observer.next(data);

      this.eventEmitterService.on('ranking.update', rankingUpdateListener);

    });
  }
}
