import {Controller, HttpStatus} from '@nestjs/common';
import {MessagePattern, RpcException} from '@nestjs/microservices';
import {MovieDto} from '@shared/dto/movie.dto';
import {MovieService} from './services/movie.service';
import {Movie} from './entities/movie.entity';
import {RatingDto} from "@shared/dto/rating.dto";

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

    @MessagePattern({cmd: 'movie_rate'})
    async rate(rateData: {movieId: number, rate: number}): Promise<RatingDto> {
        const movie = await this.movieService.find(rateData.movieId);
        if (!movie) {
            throw new RpcException({
                message: 'Not found',
                statusCode: HttpStatus.NOT_FOUND
            });
        }
        movie.rating = (movie.rating * movie.votes + rateData.rate) / (movie.votes + 1);
        movie.votes += 1;
        await this.movieService.save(movie);

        return {
            movieId: movie.id,
            rating: movie.rating,
            votes: movie.votes,
        };
    }
}
