import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import Person from '@modules/person/infra/typeorm/entities/Person';

export default class GetPersonController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(Person);
    const movieRepository = getRepository(Movie);

    let persons = await repository.find();

    if (persons) {
      const personsPromise = persons.map(async person => {
        const moviesPromise = person.movie_id.map(mId => {
          const moviePromise = movieRepository.find({
            where: { id: mId },
            relations: ['category'],
          });

          return moviePromise;
        });

        const moviesMatrix = await Promise.all(moviesPromise);

        const [movies] = moviesMatrix;

        person.movie = movies;

        return person;
      });

      persons = await Promise.all(personsPromise);
    }

    return response.json(persons);
  }
}
