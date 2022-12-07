import { Module } from '@nestjs/common';
import { DxDbeService } from './dx.dbe.service';
import { DxDbeController } from './dx.dbe.controller';

@Module({
  controllers: [DxDbeController],
  providers: [DxDbeService]
})
export class DxDbeModule {}
