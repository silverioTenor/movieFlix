import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Movie from './Movie';

@Entity()
export default class Person {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public age: number;

  @Column()
  public genre: 'man' | 'woman';

  @Column()
  public nationality: string;

  @Column()
  public papel: 'actor' | 'author';

  @Column('uuid', { array: true })
  public movie_id: string[];

  @ManyToMany(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  public movie: Movie[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
