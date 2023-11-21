import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movies } from './schema/movies.schema';
import { Model } from 'mongoose';
import { MovieIdDto, MoviesDto, PageLimitDto, UpdateMoviesDto } from './dto/movies.dto';
import { ActiveInactiveEnum } from './movies.enum';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movies.name) private catModel: Model<Movies>) { }
    async getMovies(query: PageLimitDto) {
        try {
            let skip = (query.page - 1) * query.limit;
            return await this.catModel.find({ status: ActiveInactiveEnum.Active }).skip(skip).limit(query.limit);
        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException()
        }
    }

    async insertMovie(body: MoviesDto) {
        try {
            return await this.catModel.create(body)
        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException()
        }
    }

    async updateMovie(param: MovieIdDto, body: UpdateMoviesDto) {
        try {
            return await this.catModel.findByIdAndUpdate(param.movie_id, body, { new: true })
        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException()
        }
    }

    async deleteMovie(param: MovieIdDto) {
        try {
            this.catModel.findByIdAndUpdate(param.movie_id, { status: ActiveInactiveEnum.Inactive });
            return;
        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException()
        }
    }
}