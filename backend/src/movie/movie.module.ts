import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import {RatingGateway} from "./rating.gateway";

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [RatingGateway],
})
export class MovieModule {}
