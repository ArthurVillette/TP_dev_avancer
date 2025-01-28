"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./match.entity");
const player_entity_1 = require("../player/player.entity");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService {
    constructor(matchRepository, playerRepository, PlayerService) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
        this.PlayerService = PlayerService;
    }
    async createMatch(matchData) {
        const match = this.matchRepository.create(matchData);
        return this.matchRepository.save(match);
    }
    async matchPlay(winner, loser, draw) {
        if (draw) {
        }
        else {
            const playerWinner = await this.playerRepository.findOne({ where: { id: winner } });
            const playerLoser = await this.playerRepository.findOne({ where: { id: loser } });
            if (playerWinner && playerLoser) {
                let Rh = playerWinner.rank;
                let Rl = playerLoser.rank;
                const proba = 1 / (1 + Math.pow(10, (Rl - Rh) / 400));
                this.PlayerService.updateElo(playerWinner, 1, proba);
                this.PlayerService.updateElo(playerLoser, 0, proba);
            }
        }
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(2, (0, typeorm_1.InjectRepository)(player_service_1.PlayerService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map