import IPersonRepository from '@modules/person/repositories/IPersonRepository';
import { getRepository, Repository } from 'typeorm';
import IPerson from '@modules/person/dtos/IPerson';
import Person from '../entities/Person';

export default class PersonRepository implements IPersonRepository {
  private ormRepository: Repository<Person>;

  private person: Person | undefined;

  private persons: Person[] | undefined;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async findAll(): Promise<Person[] | undefined> {
    this.persons = await this.ormRepository.find();

    return this.persons;
  }

  public async findBy(param: string | number | boolean): Promise<Person | undefined> {
    this.person = await this.ormRepository.findOne({ where: { param } });

    return this.person;
  }

  public async create(data: IPerson): Promise<Person> {
    this.person = await this.ormRepository.create(data);

    await this.ormRepository.save(this.person);

    return this.person;
  }

  public async update(data: IPerson): Promise<Person> {
    this.person = await this.ormRepository.save(data);

    return this.person;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
