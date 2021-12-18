import { Router } from 'express';
import { getRepository } from 'typeorm';
import Movie from '../entities/Movie';
import Person from '../entities/Person';
import AppError from '../errors/AppError';

const personRouter = Router();

personRouter.get('/', async (request, response) => {
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
});

personRouter.post('/', async (request, response) => {
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
});

personRouter.put('/:id', async (request, response) => {
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
});

export default personRouter;
