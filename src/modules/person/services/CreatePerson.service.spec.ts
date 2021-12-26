import AppError from '@shared/errors/AppError';

import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import CreatePersonService from './CreatePerson.service';

let fakePersonRepository: FakePersonRepository;
let createPerson: CreatePersonService;

describe('CreatePerson', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();
    createPerson = new CreatePersonService(fakePersonRepository);
  });

  it('Shoud be able to create a new person', async () => {
    const person = await createPerson.run({
      name: 'John Doe',
      age: 27,
      genre: 'man',
      nationality: 'United State of America',
      papel: 'author',
      movie_id: [],
    });

    expect(person).toHaveProperty('id');
  });

  it('Shoud not be able to create a duplicate person', async () => {
    await createPerson.run({
      name: 'John Doe',
      age: 27,
      genre: 'man',
      nationality: 'United State of America',
      papel: 'author',
      movie_id: [],
    });

    await expect(
      createPerson.run({
        name: 'John Doe',
        age: 27,
        genre: 'man',
        nationality: 'United State of America',
        papel: 'author',
        movie_id: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
