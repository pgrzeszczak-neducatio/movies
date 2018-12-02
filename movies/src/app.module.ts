import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { AppController } from './app.controller';

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
  controllers: [AppController],
})
export class AppModule {}
