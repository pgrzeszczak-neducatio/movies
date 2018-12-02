import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}
