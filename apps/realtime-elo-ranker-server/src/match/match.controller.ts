import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async playMatch(@Body() matchData: { winner: string, loser: string, draw: boolean }): Promise<void> {
    return this.matchService.matchPlay(matchData.winner, matchData.loser, matchData.draw);
  }
}
