import { MatchService } from './match.service';
export declare class MatchController {
    private readonly MatchService;
    constructor(MatchService: MatchService);
    playMatch(matchData: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<void>;
}
