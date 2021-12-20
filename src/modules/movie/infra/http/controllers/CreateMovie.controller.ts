import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Category from '@modules/category/infra/typeorm/entities/Category';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

export default class CreateMovieController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { title, duration, release, category_id, age_group, sinopse, link } = request.body;

    const repository = await getRepository(Movie);

    const foundedMovie = await repository.findOne({ where: { title } });

    if (foundedMovie) {
      throw new AppError('Movie already exists', 401);
    }

    const categoryRepository = await getRepository(Category);

    const category = await categoryRepository.findOne(category_id);

    if (!category) {
      throw new AppError('Category not found!', 400);
    }

    const movie = await repository.create({
      title,
      duration,
      release,
      category_id,
      age_group,
      sinopse,
      link,
    });

    await repository.save(movie);

    movie.category = category;

    return response.json(movie);
  }
}
