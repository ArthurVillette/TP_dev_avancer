import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterService } from './ranking-event.service';

describe('EventEmitterService', () => {
  let service: EventEmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEmitterService],
    }).compile();

    service = module.get<EventEmitterService>(EventEmitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit and listen to events', (done) => {
    const eventName = 'test.event';
    const eventData = { key: 'value' };

    service.on(eventName, (data) => {
      expect(data).toEqual(eventData);
      done();
    });

    service.emit(eventName, eventData);
  });

  it('should emit ranking.update event', (done) => {
    const eventData = { key: 'value' };

    service.on('ranking.update', (data) => {
      expect(data).toEqual(eventData);
      done();
    });

    service.MAJ(eventData);
  });

  it('should remove listener', () => {
    const eventName = 'test.event';
    const listener = jest.fn();

    service.on(eventName, listener);
    service.emit(eventName, { key: 'value' });
    expect(listener).toHaveBeenCalled();

    service.off(eventName, listener);
    service.emit(eventName, { key: 'value' });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should remove all listeners', () => {
    const eventName = 'test.event';
    const listener = jest.fn();

    service.on(eventName, listener);
    service.emit(eventName, { key: 'value' });
    expect(listener).toHaveBeenCalled();

    service.removeAllListeners(eventName);
    service.emit(eventName, { key: 'value' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
