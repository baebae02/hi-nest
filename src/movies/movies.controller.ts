import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }
    //id가 위에 있으면 다른 get들이 작동하질 않아
    @Get('/:id')
    getOne(@Param('id') id: string):Movie{
        return this.moviesService.getOne(id);
    }
    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData);
    }
    @Delete('/:id')
    remove(@Param('id') id: string){
        return this.moviesService.deleteOne(id);
    }
    @Patch('/:id')
    patch(@Param('id') id: string, @Body() updateData){
        return {
            updatedMovie:id,
            ...updateData,
        }
    }
}
