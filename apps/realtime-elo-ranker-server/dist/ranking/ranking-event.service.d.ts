export declare class EventEmitterService {
    private eventEmitter;
    on(event: string, listener: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): boolean;
    removeListener(event: string, listener: (...args: any[]) => void): void;
    removeAllListeners(event?: string): void;
    MAJ(...args: any[]): boolean;
}
