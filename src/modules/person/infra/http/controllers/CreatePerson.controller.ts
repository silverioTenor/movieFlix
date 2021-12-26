import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { container } from 'tsyringe';

import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import CreatePersonService from '@modules/person/services/CreatePerson.service';

export default class CreatePersonController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { name, age, genre, nationality, papel, movie_id } = request.body;

    const createPerson = container.resolve(CreatePersonService);

    const person = await createPerson.run({
      name,
      age,
      genre,
      nationality,
      papel,
      movie_id,
    });

    const movieRepository = getRepository(Movie);

    const moviesPromise = movie_id.map((mId: string) => {
      const moviePromise = movieRepository.findOne({
        where: { id: mId },
        relations: ['category'],
      });

      return moviePromise;
    });

    const moviesMatrix = await Promise.all(moviesPromise);

    const movies = moviesMatrix;

    if (movies) {
      person.movie = movies;
    }

    return response.json(person);
  }
}
