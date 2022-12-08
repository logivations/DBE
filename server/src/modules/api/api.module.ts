import { Module } from '@nestjs/common';
import { DxDbeModule } from './dx.dbe/dx.dbe.module';
import { AnonymousModule } from './anonymous/anonymous.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  controllers: [],
  imports: [DxDbeModule, AnonymousModule, SettingsModule]
})
export class ApiModule {}
