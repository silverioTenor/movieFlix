import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Category from '@modules/category/infra/typeorm/entities/Category';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

export default class UpdateMovieController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, duration, release, category_id, age_group, sinopse, link } = request.body;

    const repository = getRepository(Movie);

    const movie = await repository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(movie.category_id);

    Object.assign(movie, {
      title,
      duration,
      release,
      category_id,
      age_group,
      sinopse,
      link,
    });

    await repository.save(movie);

    movie.category = category ? category : ({} as Category);

    return response.json(movie);
  }
}
