import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';

import IPersonRepository from '../IPersonRepository';

import IPerson from '../../dtos/IPerson';
import Person from '../../infra/typeorm/entities/Person';

export default class FakePersonRepository implements IPersonRepository {
  private person: Person;

  private persons: Set<Person>;

  constructor() {
    this.person = new Person();
    this.persons = new Set();
  }

  public async findAll(): Promise<Person[] | undefined> {
    return [...this.persons];
  }

  public async findBy(param: {
    [key: string]: string | number | boolean;
  }): Promise<Person | undefined> {
    this.persons.forEach(_p => {
      let found = false;

      Object.keys(param).map(p => {
        if (_p.name === param[p]) {
          found = true;
        }
      });

      if (found) {
        this.person = _p;
      } else {
        this.person = {} as Person;
      }
    });

    return this.person;
  }

  public async create(data: IPerson): Promise<Person> {
    Object.assign(this.person, { id: uuid(), ...data });

    this.persons.add(this.person);

    return this.person;
  }

  public async update(data: IPerson): Promise<Person> {
    this.person = {} as Person;

    this.persons.forEach(person => {
      if (person.id === data.id) {
        person = { ...person, ...data };
        this.person = person;
      } else {
        throw new AppError('Person not found!', 404);
      }
    });

    return this.person;
  }

  public async delete(id: string): Promise<void> {
    this.persons.forEach(person => {
      if (person.id === id) {
        this.persons.delete(person);
      } else {
        throw new AppError('Person not found!', 404);
      }
    });
  }
}
