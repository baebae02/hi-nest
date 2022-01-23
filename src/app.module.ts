import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

//meta data
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
  //exports 4가지
})
export class AppModule {}
