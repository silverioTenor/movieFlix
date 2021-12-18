import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Movie from '../entities/Movie';
import Person from '../entities/Person';
import AppError from '../errors/AppError';

export default class CreatePersonController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { name, age, genre, nationality, papel, movie_id } = request.body;

    const repository = getRepository(Person);

    let person = await repository.findOne({ where: { name } });

    if (person) {
      throw new AppError('Person alreary exists!', 401);
    }

    person = repository.create({
      name,
      age,
      genre,
      nationality,
      papel,
      movie_id: [movie_id],
    });

    await repository.save(person);

    const movieRepository = getRepository(Movie);

    const movies = await movieRepository.find({ where: { id: movie_id }, relations: ['category'] });

    if (movies) {
      person.movie = movies;
    }

    return response.json(person);
  }
}
