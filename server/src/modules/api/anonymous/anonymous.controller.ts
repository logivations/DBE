import {Controller, Get} from '@nestjs/common';

@Controller('anonymous')
export class AnonymousController {
    @Get()
    ping() {
        return true;
    }
}
