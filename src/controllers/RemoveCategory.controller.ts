import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

export default class RemoveCategoryController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const categRepo = getRepository(Category);

    const category = await categRepo.findOne(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    await categRepo.remove(category);

    return response.status(204).json();
  }
}
