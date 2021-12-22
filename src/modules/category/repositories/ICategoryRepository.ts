import ICategory from '../dtos/ICategory';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  findAll(): Promise<Category[] | undefined>;
  findBy(param: string | number | boolean): Promise<Category | undefined>;
  create(data: ICategory): Promise<Category>;
  update(data: ICategory): Promise<Category>;
  delete(id: string): Promise<void>;
}
