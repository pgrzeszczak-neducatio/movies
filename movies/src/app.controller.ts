import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class AppController {
    @MessagePattern({cmd: 'sum'})
    sum(data: number[]): number {
        console.log('TUTAJ!!!!');
        return (data || []).reduce((a, b) => a + b);
    }
}
