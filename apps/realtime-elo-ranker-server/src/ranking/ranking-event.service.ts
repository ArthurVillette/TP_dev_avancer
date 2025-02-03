import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class EventEmitterService {
  private eventEmitter = new EventEmitter2();

  on(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.on(event, listener);
  }

  emit(event: string, ...args: any[]): boolean {
    try {
      return this.eventEmitter.emit(event, ...args);
    } catch (error) {
      console.error(`Error emitting event ${event}:`, error);
      return false;
    }
  }

  removeListener(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.removeListener(event, listener);
  }

  removeAllListeners(event?: string): void {
    this.eventEmitter.removeAllListeners(event);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.off(event, listener);
  }

  MAJ(...args: any[]): boolean {
    return this.eventEmitter.emit('ranking.update', ...args);
  }
}
