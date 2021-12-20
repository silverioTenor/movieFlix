import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '@modules/category/infra/typeorm/entities/Category';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

export default class GetMovieController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(Movie);
    const categoryRepository = getRepository(Category);

    let movies = await repository.find();

    const moviePormise = movies.map(async movie => {
      const category = await categoryRepository.findOne({ where: { id: movie.category_id } });

      movie.category = category ? category : ({} as Category);

      return movie;
    });

    movies = await Promise.all(moviePormise);

    return response.json(movies);
  }
}
