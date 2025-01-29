import { Module } from '@nestjs/common';
import { EventEmitterService } from './ranking-event.service';

@Module({
  providers: [EventEmitterService],
  exports: [EventEmitterService],
})
export class RankingEventModule {}
