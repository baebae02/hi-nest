import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

//meta data
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  //exports 4가지
})
export class AppModule {}
