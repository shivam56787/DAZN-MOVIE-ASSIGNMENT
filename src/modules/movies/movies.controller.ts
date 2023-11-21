import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto, PageLimitDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Get()
    async getMovies(@Query() query: PageLimitDto) {
        return await this.moviesService.getMovies(query);
    }

    @Post()
    async createMovie(@Body() body: MoviesDto) {
        return await this.moviesService.insertMovie(body);
    }

}
