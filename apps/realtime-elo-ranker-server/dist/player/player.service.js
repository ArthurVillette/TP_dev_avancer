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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./player.entity");
const ranking_event_service_1 = require("../ranking/ranking-event.service");
let PlayerService = class PlayerService {
    constructor(playerRepository, eventEmitterService) {
        this.playerRepository = playerRepository;
        this.eventEmitterService = eventEmitterService;
    }
    async getAllPlayers() {
        return this.playerRepository.find();
    }
    async createPlayer(playerData) {
        const player = this.playerRepository.create(playerData);
        const savedPlayer = await this.playerRepository.save(player);
        try {
            this.eventEmitterService.emit('playerUpdated', savedPlayer);
            this.eventEmitterService.MAJ(savedPlayer);
        }
        catch (error) {
            console.error('Error emitting event:', error);
        }
        return savedPlayer;
    }
    async seedPlayers() {
        const players = [
            { id: 'Arthur', rank: 1850 },
            { id: 'burito', rank: 1200 },
            { id: 'Magnus Carlsen', rank: 2850 },
            { id: 'Hugo', rank: 1000 },
        ];
        for (const playerData of players) {
            await this.createPlayer(playerData);
        }
    }
    async updateElo(player, resultat, proba) {
        if (!player) {
            throw new Error('Player not found');
        }
        const newElo = Math.round(player.rank + 32 * (resultat - proba));
        player.rank = newElo;
        const updatedPlayer = await this.playerRepository.save(player);
        try {
            this.eventEmitterService.emit('playerUpdated', updatedPlayer);
            this.eventEmitterService.MAJ(updatedPlayer);
        }
        catch (error) {
            console.error('Error emitting event:', error);
        }
        return updatedPlayer;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_event_service_1.EventEmitterService])
], PlayerService);
//# sourceMappingURL=player.service.js.map