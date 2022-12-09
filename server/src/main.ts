import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './modules/app.module';
// import { PrismaClient } from '@prisma/client'
const {exec} = require('child_process');


async function main() {
  import(join(__dirname, '../..', 'db', 'prisma', 'v1', 'generated', 'client')).then(async (Prisma) => {
    const prisma = new Prisma.PrismaClient()
    const ips_copy = await prisma.ips_copy.findMany()
    console.log('Prisma', Prisma);
    console.log('ips_copy', ips_copy)
  }).catch((Error) => {
    console.log('Error', Error);
  })

  import(join(__dirname, '../..', 'db', 'prisma', 'v2', 'generated', 'client')).then(async (Prisma) => {
    const prisma = new Prisma.PrismaClient()
    const lv_wh_station = await prisma.lv_wh_station.findMany()
    console.log('Prisma', Prisma);
    console.log('lv_wh_station', lv_wh_station)
  }).catch((Error) => {
    console.log('Error', Error);
  })
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  app.useStaticAssets(join(__dirname, '../..', 'client', 'dist'));
  app.setBaseViewsDir(join(__dirname, '../..', 'client', 'views'));
  app.setViewEngine('ejs');

  const serverHost = process.env.HOST || '0.0.0.0';
  const serverPort = parseInt(process.env.PORT, 10) || 3001;
  await app.listen(serverPort, serverHost, () => {

  });
  // exec('npx prisma db pull --schema ./../db/prisma/v2/schema.prisma', (...rest) => {
  //   console.log('rest', rest);
  //   exec('npx prisma generate --schema ./../db/prisma/v2/schema.prisma', (...qqq) => {
  //     console.log('qqq', qqq);
  //
  //
  //   })
  // })
      setTimeout(() => {
        console.log('run MAIN');
        main()
      }, 5000)
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();