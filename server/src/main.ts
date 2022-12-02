import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
  );
  console.log('qwe', join(__dirname, '../..', 'client', 'dist'),);
  // const app = await NestFactory.create(AppModule);
  app.useStaticAssets({
    root: join(__dirname, '../..', 'client', 'dist'),
  });
  await app.listen(3002);
}
bootstrap();
