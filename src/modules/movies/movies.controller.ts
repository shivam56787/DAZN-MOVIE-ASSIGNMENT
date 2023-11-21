import { Controller, Get, Post, Body, Query, Put, Delete, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindMovieDto, MovieIdDto, MoviesDto, PageLimitDto, UpdateMoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Get()
    async getMovies(@Query() query: PageLimitDto) {
        return await this.moviesService.getMovies(query);
    }

    @Get('/search')
    async findMovies(@Query() query: FindMovieDto) {
        return await this.moviesService.findMovies(query);
    }

    @Post()
    async createMovie(@Body() body: MoviesDto) {
        return await this.moviesService.insertMovie(body);
    }

    @Put('/:movie_id')
    async updateMovie(@Param() param: MovieIdDto, @Body() body: UpdateMoviesDto) {
        return await this.moviesService.updateMovie(param,body);
    }

    @Delete('/:movie_id')
    async deleteMove(@Param() param: MovieIdDto) {
        return await this.moviesService.deleteMovie(param);
    }

}
