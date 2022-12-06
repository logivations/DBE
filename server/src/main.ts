import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  app.useStaticAssets(join(__dirname, '../..', 'client', 'dist'));
  app.setBaseViewsDir(join(__dirname, '../..', 'client', 'views'));
  app.setViewEngine('ejs');

  const serverHost = process.env.HOST || '0.0.0.0';
  const serverPort = parseInt(process.env.PORT, 10) || 3001;
  await app.listen(serverPort, serverHost);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();