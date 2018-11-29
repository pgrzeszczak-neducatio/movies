import {Get, Controller} from '@nestjs/common';
import {Client, ClientProxy, Transport} from '@nestjs/microservices';

@Controller()
export class AppController {
    @Client({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://queue:5672`],
            queue: 'movies_queue',
            queueOptions: {durable: false},
        },
    })
    client: ClientProxy;

    @Get()
    async root(): Promise<string> {
        const sum = await this.client.send<number>({cmd: 'sum'}, [1, 2, 3, 4]).toPromise();
        return `Sum of [1, 2, 3, 4] is ${sum}`;
    }
}
