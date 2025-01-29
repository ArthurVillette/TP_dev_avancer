import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    playMatch(matchData: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<void>;
}
