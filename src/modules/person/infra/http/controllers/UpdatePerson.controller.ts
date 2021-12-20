import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import Person from '@modules/person/infra/typeorm/entities/Person';

export default class UpdatePersonController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, age, genre, nationality, papel, movie_id } = request.body;

    const repository = getRepository(Person);

    const person = await repository.findOne({ where: { id } });

    if (!person) {
      throw new AppError('Person not found!', 404);
    }

    const movieIdArray = new Set([...person.movie_id, ...movie_id]);

    Object.assign(person, {
      name,
      age,
      genre,
      nationality,
      papel,
      movie_id: [...movieIdArray],
    });

    await repository.save(person);

    const movieRepository = getRepository(Movie);

    const movies = new Set([] as Movie[]);

    for await (const mId of movieIdArray) {
      const movie = await movieRepository.findOne({ where: { id: mId }, relations: ['category'] });

      if (movie) {
        movies.add(movie);
      }
    }

    person.movie = [...movies];

    return response.json(person);
  }
}
