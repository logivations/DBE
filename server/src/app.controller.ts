import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  @Render('index.html')
  getHello() {
  }
  // @Get('dbe')
  // @Render('index')
  // dbe() {
  // }
}
