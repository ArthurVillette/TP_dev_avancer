import { Controller, Get } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }
}
