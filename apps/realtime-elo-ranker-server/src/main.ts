import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PlayerService } from './player/player.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Obtenez les services de seeding
  const playerService = app.get(PlayerService);

  // Appelez les méthodes de seeding
  await playerService.seedPlayers();
  app.enableCors();
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
