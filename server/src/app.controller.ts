import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  @Render('index.ejs')
  getHello() {
    return {warehouseId: 123321, campaignId: 222333};
  }
}
