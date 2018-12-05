import {Get, Controller, Post, Body, Param, HttpException, HttpStatus} from '@nestjs/common';
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

    @Get(':id')
    async get(@Param('id') id): Promise<MovieDto> {
        let movie;
        try {
            movie = await this.client.send<MovieDto, number>({cmd: 'movie_find'}, id).toPromise();
        } catch (e) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return movie;
    }

    @Post()
    create(@Body() movieData: MovieDto): Observable<MovieDto> {
        return this.client.send<MovieDto, MovieDto>({cmd: 'movie_add'}, movieData);
    }
}
