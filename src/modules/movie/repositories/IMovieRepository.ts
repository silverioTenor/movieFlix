import IMovie from '../dtos/IMovie';
import Movie from '../infra/typeorm/entities/Movie';

export default interface IMovieRepository {
  findAll(): Promise<Movie[] | undefined>;
  findBy(param: string | number | boolean): Promise<Movie | undefined>;
  create(data: IMovie): Promise<Movie>;
  update(data: IMovie): Promise<Movie>;
  delete(id: string): Promise<void>;
}
