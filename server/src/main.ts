import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useStaticAssets(join(__dirname, '../..', 'client', 'dist', 'static'));
  app.setBaseViewsDir(join(__dirname, '../..', 'client', 'dist', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();