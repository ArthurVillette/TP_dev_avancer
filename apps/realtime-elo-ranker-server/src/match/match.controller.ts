import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
  constructor(private readonly MatchService: MatchService) {}

  @Post()
  async playMatch(@Body() matchData: { winner: string, loser: string, draw: boolean }): Promise<void> {

      return this.MatchService.matchPlay(matchData.winner,matchData.loser,matchData.draw) }

    
}
