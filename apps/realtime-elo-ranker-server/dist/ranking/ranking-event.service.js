"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterService = void 0;
const common_1 = require("@nestjs/common");
const eventemitter2_1 = require("eventemitter2");
let EventEmitterService = class EventEmitterService {
    constructor() {
        this.eventEmitter = new eventemitter2_1.EventEmitter2();
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    emit(event, ...args) {
        return this.eventEmitter.emit(event, ...args);
    }
    removeListener(event, listener) {
        this.eventEmitter.removeListener(event, listener);
    }
    removeAllListeners(event) {
        this.eventEmitter.removeAllListeners(event);
    }
    MAJ(...args) {
        return this.eventEmitter.emit('ranking.update', ...args);
    }
};
exports.EventEmitterService = EventEmitterService;
exports.EventEmitterService = EventEmitterService = __decorate([
    (0, common_1.Injectable)()
], EventEmitterService);
//# sourceMappingURL=ranking-event.service.js.map