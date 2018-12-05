import {Controller, HttpStatus} from '@nestjs/common';
import {MessagePattern, RpcException} from '@nestjs/microservices';
import {MovieDto} from '@shared/dto/movie.dto';
import {MovieService} from './services/movie.service';
import {Movie} from './entities/movie.entity';

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @MessagePattern({cmd: 'movie_add'})
    async add(movieData: MovieDto): Promise<Movie> {
        return this.movieService.add(movieData);
    }

    @MessagePattern({cmd: 'movie_findAll'})
    async findAll(): Promise<Movie[]> {
        return this.movieService.findAll();
    }

    @MessagePattern({cmd: 'movie_find'})
    async find(movieId: number): Promise<Movie> {
        const movie = await this.movieService.find(movieId);
        if (!movie) {
            throw new RpcException({
                message: 'Not found',
                statusCode: HttpStatus.NOT_FOUND
            });
        }
        return movie;
    }
}
