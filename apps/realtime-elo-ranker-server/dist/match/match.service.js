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
const player_entity_1 = require("../player/player.entity");
const player_service_1 = require("../player/player.service");
const ranking_event_service_1 = require("../ranking/ranking-event.service");
let MatchService = class MatchService {
    constructor(playerRepository, playerService, eventEmitterService) {
        this.playerRepository = playerRepository;
        this.playerService = playerService;
        this.eventEmitterService = eventEmitterService;
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
                const probaAdversaire1 = 1 / (1 + Math.pow(10, (Rl - Rh) / 400));
                const probaAdversaire2 = 1 / (1 + Math.pow(10, (Rh - Rl) / 400));
                await this.playerService.updateElo(playerWinner, 1, probaAdversaire1);
                await this.playerService.updateElo(playerLoser, 0, probaAdversaire2);
            }
        }
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        player_service_1.PlayerService,
        ranking_event_service_1.EventEmitterService])
], MatchService);
//# sourceMappingURL=match.service.js.map