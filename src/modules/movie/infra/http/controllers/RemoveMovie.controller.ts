import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

export default class RemoveMovieController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const repository = getRepository(Movie);

    const movie = await repository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    await repository.delete(movie.id);

    return response.status(204).json();
  }
}
