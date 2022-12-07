import { Module } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { AnonymousController } from './anonymous.controller';

@Module({
  providers: [AnonymousService],
  controllers: [AnonymousController]
})
export class AnonymousModule {}
