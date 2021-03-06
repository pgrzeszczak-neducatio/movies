import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { MovieDto } from '@shared/dto/movie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }

    find(id: number): Promise<Movie> {
        return this.movieRepository.findOne({ id });
    }

    add(movieData: MovieDto): Promise<Movie> {
        const movie = this.movieRepository.create(movieData);
        return this.movieRepository.save(movie);
    }

    save(movie: Movie): Promise<Movie> {
        return this.movieRepository.save(movie);
    }
}
