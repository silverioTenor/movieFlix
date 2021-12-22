import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import ICategory from '../../../dtos/ICategory';
import Category from '../entities/Category';

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  private category: Category | undefined;

  private categories: Category[] | undefined;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[] | undefined> {
    this.categories = await this.ormRepository.find();

    return this.categories;
  }

  public async findBy(param: string | number | boolean): Promise<Category | undefined> {
    this.category = await this.ormRepository.findOne({ where: { param } });

    return this.category;
  }

  public async create(data: ICategory): Promise<Category> {
    this.category = await this.ormRepository.create(data);

    await this.ormRepository.save(this.category);

    return this.category;
  }

  public async update(data: ICategory): Promise<Category> {
    this.category = await this.ormRepository.save(data);

    return this.category;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
