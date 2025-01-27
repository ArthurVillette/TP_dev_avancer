"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const player_service_1 = require("./player/player.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const playerService = app.get(player_service_1.PlayerService);
    await playerService.seedPlayers();
    app.enableCors();
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map