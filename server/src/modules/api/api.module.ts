import { Module } from '@nestjs/common';
import { DxDbeModule } from './dx.dbe/dx.dbe.module';
import { AnonymousModule } from './anonymous/anonymous.module';

@Module({
  controllers: [],
  imports: [DxDbeModule, AnonymousModule]
})
export class ApiModule {}
