import {Get, Controller, Post, Body} from '@nestjs/common';
import {Client, ClientProxy, Transport} from '@nestjs/microservices';
import {Observable} from 'rxjs';
import {MovieDto} from '@shared/dto/movie.dto';

@Controller('movie')
export class MovieController {
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
    getAll(): Observable<MovieDto[]> {
        return this.client.send<MovieDto[]>({cmd: 'movie_findAll'}, {});
    }

    @Post()
    create(@Body() movieData: MovieDto): Observable<MovieDto> {
        return this.client.send<MovieDto>({cmd: 'movie_add'}, movieData);
    }
}
