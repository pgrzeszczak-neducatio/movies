import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'database',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'movies',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      MovieModule,
  ],
})
export class AppModule {}
