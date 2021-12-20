import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Category from '@modules/category/infra/typeorm/entities/Category';

export default class CreateCategoryController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const categRepo = getRepository(Category);

    const foundCategory = await categRepo.findOne({ where: { name } });

    if (foundCategory) {
      throw new AppError('Category already exists!', 401);
    }

    const category = categRepo.create({ name, description });

    await categRepo.save(category);

    return response.json(category);
  }
}
