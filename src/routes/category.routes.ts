import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

const categoryRouter = Router();

categoryRouter.get('/', async (request, response) => {
  const categRepo: Repository<Category> = getRepository(Category);

  const categories = await categRepo.find();

  return response.json(categories);
});

categoryRouter.post('/', async (request, response) => {
  const { name, description } = request.body;

  const categRepo: Repository<Category> = getRepository(Category);

  const foundCategory = await categRepo.findOne({ where: { name } });

  if (foundCategory) {
    throw new AppError('Category already exists!');
  }

  const category = categRepo.create({ name, description });

  await categRepo.save(category);

  return response.json(category);
});

export default categoryRouter;
