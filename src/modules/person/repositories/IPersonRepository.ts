import IPerson from '../dtos/IPerson';
import Person from '../infra/typeorm/entities/Person';

export default interface IPersonRepository {
  findAll(): Promise<Person[] | undefined>;
  findBy(param: string | number | boolean): Promise<Person | undefined>;
  create(data: IPerson): Promise<Person>;
  update(data: IPerson): Promise<Person>;
  delete(id: string): Promise<void>;
}
