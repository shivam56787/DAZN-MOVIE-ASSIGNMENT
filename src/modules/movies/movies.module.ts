import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from './schema/movies.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule { }
