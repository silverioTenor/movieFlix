import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

const categoryRouter = Router();

categoryRouter.get('/', async (request, response) => {
  const categRepo = getRepository(Category);

  const categories = await categRepo.find();

  return response.json(categories);
});

categoryRouter.post('/', async (request, response) => {
  const { name, description } = request.body;

  const categRepo = getRepository(Category);

  const foundCategory = await categRepo.findOne({ where: { name } });

  if (foundCategory) {
    throw new AppError('Category already exists!', 401);
  }

  const category = categRepo.create({ name, description });

  await categRepo.save(category);

  return response.json(category);
});

categoryRouter.put('/:id', async (request, response) => {
  const id = request.params;
  const { name, description } = request.body;

  const categRepo = getRepository(Category);

  const category = await categRepo.findOne(id);

  if (!category) {
    throw new AppError('Category not found!', 404);
  }

  Object.assign(category, { name, description });

  await categRepo.save(category);

  return response.json(category);
});

categoryRouter.delete('/:id', async (request, response) => {
  const id = request.params;

  const categRepo = getRepository(Category);

  const category = await categRepo.findOne(id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  await categRepo.remove(category);

  return response.status(204).json();
});

export default categoryRouter;
