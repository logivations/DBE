import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
console.log('qw', join(__dirname, '../..', 'client', 'views'));
  app.useStaticAssets(join(__dirname, '../..', 'client', 'dist'));
  app.setBaseViewsDir(join(__dirname, '../..', 'client', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3001);
}
bootstrap();