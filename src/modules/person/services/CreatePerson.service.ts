import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPerson from '../dtos/IPerson';
import Person from '../infra/typeorm/entities/Person';

import IPersonRepository from '../repositories/IPersonRepository';

@injectable()
export default class CreatePersonService {
  private person: Person | undefined;

  constructor(
    @inject('PersonRepository')
    private repository: IPersonRepository,
  ) {}

  public async run(personData: IPerson): Promise<Person> {
    this.person = await this.repository.findBy({ name: personData.name });

    if (this.person && this.person.id) {
      throw new AppError('Person already exists!', 401);
    }

    this.person = await this.repository.create(personData);

    return this.person;
  }
}
