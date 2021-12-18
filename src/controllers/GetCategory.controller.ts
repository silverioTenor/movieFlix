import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entities/Category';

export default class GetCategoryController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const categRepo = getRepository(Category);

    const categories = await categRepo.find();

    return response.json(categories);
  }
}
