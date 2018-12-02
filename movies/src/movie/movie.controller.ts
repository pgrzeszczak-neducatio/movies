import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {MovieDto} from './entities/movie.dto';
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
}
