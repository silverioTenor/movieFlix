import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Person from '../entities/Person';
import AppError from '../errors/AppError';

export default class RemovePersonController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const repository = getRepository(Person);

    const person = await repository.findOne({ where: { id } });

    if (!person) {
      throw new AppError('Person not found!', 404);
    }

    await repository.delete(id);

    return response.status(204).json();
  }
}
