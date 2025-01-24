import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async createMatch(matchData: Partial<Match>): Promise<Match> {
    const match = this.matchRepository.create(matchData);
    return this.matchRepository.save(match);
  }
}
