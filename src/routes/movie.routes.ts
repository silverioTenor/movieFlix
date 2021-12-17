import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import Movie from '../entities/Movie';
import AppError from '../errors/AppError';

const movieRouter = Router();

movieRouter.get('/', async (request, response) => {
  const repository = getRepository(Movie);
  const categoryRepository = getRepository(Category);

  let movies = await repository.find();

  const moviePormise = movies.map(async movie => {
    movie.category = await categoryRepository.find({ where: { id: movie.category_id } });

    return movie;
  });

  movies = await Promise.all(moviePormise);

  return response.json(movies);
});

movieRouter.post('/', async (request, response) => {
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

  movie.category = [category];

  return response.json(movie);
});

movieRouter.put('/:id', async (request, response) => {
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

  movie.category = category ? [category] : [];

  return response.json(movie);
});

movieRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const repository = getRepository(Movie);

  const movie = await repository.findOne(id);

  if (!movie) {
    throw new AppError('Movie not found', 404);
  }

  await repository.delete(movie.id);

  return response.status(204).json();
});

export default movieRouter;
