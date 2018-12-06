import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";
import {RatingDto} from "@shared/dto/rating.dto";

@WebSocketGateway()
export class RatingGateway {
    @WebSocketServer() server;

    @Client({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://queue:5672`],
            queue: 'movies_queue',
            queueOptions: {durable: false},
        },
    })
    client: ClientProxy;

    @SubscribeMessage('rate')
    async rate(client, data): Promise<void> {
        const rating = await this.client.send<RatingDto>({cmd: 'movie_rate'}, data).toPromise();
        this.server.emit('rate', rating);
    }
}
