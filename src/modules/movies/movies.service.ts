import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movies } from './schema/movies.schema';
import { Model } from 'mongoose';
import { MoviesDto, PageLimitDto } from './dto/movies.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movies.name) private catModel: Model<Movies>) { }
    async getMovies(query: PageLimitDto) {
        let skip = (query.page - 1) * query.limit;
        return await this.catModel.find().skip(skip).limit(query.limit);
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

}