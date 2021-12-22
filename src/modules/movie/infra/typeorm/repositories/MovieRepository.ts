import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import { getRepository, Repository } from 'typeorm';
import IMovie from '../../../dtos/IMovie';
import Movie from '../entities/Movie';

export default class MovieRepository implements IMovieRepository {
  private ormRepository: Repository<Movie>;

  private movie: Movie | undefined;

  private movies: Movie[] | undefined;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async findAll(): Promise<Movie[] | undefined> {
    this.movies = await this.ormRepository.find();

    return this.movies;
  }

  public async findBy(param: string | number | boolean): Promise<Movie | undefined> {
    this.movie = await this.ormRepository.findOne({ where: { param } });

    return this.movie;
  }

  public async create(data: IMovie): Promise<Movie> {
    this.movie = await this.ormRepository.create(data);

    await this.ormRepository.save(this.movie);

    return this.movie;
  }

  public async update(data: IMovie): Promise<Movie> {
    this.movie = await this.ormRepository.save(data);

    return this.movie;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
