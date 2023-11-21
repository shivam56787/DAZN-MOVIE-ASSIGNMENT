import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movies } from './schema/movies.schema';
import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

class MockMovieModel {
  static movies = [];

  constructor(private data) { }

  save = jest.fn().mockResolvedValue(this.data);

  static find = jest.fn().mockImplementation(() => ({
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue(MockMovieModel.movies),
  }));

  static findByIdAndUpdate = jest.fn().mockResolvedValue({
    "_id": "655cfecb1fbe0a0d6392c580",
    "status": "Active",
    "title": "Farzii",
    "genre": "Thriller",
    "rating": 3,
    "streaming_link": "https://www.google.com",
    "created_at": "2023-11-21T19:02:35.521Z",
    "updated_at": "2023-11-21T20:18:26.949Z"
  });

  static create = jest.fn().mockResolvedValue({
    "title": "Fukrey",
    "genre": "Action",
    "streaming_link": "https://www.google.com",
    "rating": 3
  });
}

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movies.name),
          useValue: MockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<Movies>>(getModelToken(Movies.name));
  });

  describe('getMovies', () => {
    it('should return movies', async () => {
      MockMovieModel.movies = [{
        "title": "Fukrey",
        "genre": "Action",
        "streaming_link": "https://www.google.com",
        "rating": 3
      }, {
        "title": "Farzii",
        "genre": "Thriller",
        "rating": 3,
        "streaming_link": "https://www.google.com"
      }];
      const result = await service.getMovies({ page: 1, limit: 10 });
      expect(result).toEqual(MockMovieModel.movies);
    });

  });

  describe('insertMovie', () => {
    it('should insert a new movie', async () => {
      const newMovie = {
        "title": "Fukrey",
        "genre": "Action",
        "streaming_link": "https://www.google.com",
        "rating": 3
      };
      const result = await service.insertMovie(newMovie);
      expect(result).toEqual(newMovie);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const updatedMovie = { title: 'Farzi', genre: 'Thriller', rating: 3, streaming_link: "https://www.google.com" };
      const movieId = new Types.ObjectId('655cfecb1fbe0a0d6392c580');
      MockMovieModel.findByIdAndUpdate.mockResolvedValue(updatedMovie);

      const result = await service.updateMovie({movie_id: movieId}, updatedMovie);

      expect(result).toEqual(updatedMovie);
      expect(MockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(movieId, updatedMovie, { new: true });
    });

    it('should handle movie not found error', async () => {
      const updatedMovie = { title: 'Farzi', genre: 'Thriller', rating: 3, streaming_link: "https://www.google.com" };
      const movieId = new Types.ObjectId('655cfecb1fbe0a0d6392c580');
      MockMovieModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.updateMovie({ movie_id: movieId }, updatedMovie)).rejects.toThrow(
        new HttpException('Movie not found', HttpStatus.NOT_FOUND),
      );

      expect(MockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(movieId, updatedMovie, { new: true });
    });

    it('should handle internal server error', async () => {
      const updatedMovie =  { title: 'Farzi', genre: 'Thriller', rating: 3, streaming_link: "https://www.google.com" };
      const movieId = new Types.ObjectId('655cfecb1fbe0a0d6392c580');;
      MockMovieModel.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await expect(service.updateMovie({ movie_id: movieId }, updatedMovie)).rejects.toThrow(
        new InternalServerErrorException('Internal Server Error'),
      );

      expect(MockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(movieId, updatedMovie, { new: true });
    });
  });
});
