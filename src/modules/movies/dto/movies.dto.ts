import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsUrl,
    IsInt,
    Min,
    Max,
    IsOptional,
    IsMongoId,
  } from 'class-validator';
import { Types } from 'mongoose';

export const DEFAULT_PAGE_LIMIT = 50;
export const DEFAULT_PAGE = 1;
export class MoviesDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsUrl({ protocols: ['https'] })
    @IsNotEmpty()
    streaming_link: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}

export class PageLimitDto {
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    page?: number = DEFAULT_PAGE;
  
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    limit?: number = DEFAULT_PAGE_LIMIT;
}

export class MovieIdDto {
    @IsNotEmpty()
    @IsMongoId()
    movie_id: Types.ObjectId;
}

export class UpdateMoviesDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    genre: string;

    @IsUrl({ protocols: ['https'] })
    @IsOptional()
    streaming_link: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}

export class FindMovieDto extends PageLimitDto {
    @IsNotEmpty()
    @IsString()
    search: string;
}