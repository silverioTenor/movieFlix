import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './Category';

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public duration: number;

  @Column('time without time zone')
  public release: Date;

  @Column()
  public category_id: string;

  @ManyToMany(() => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @Column()
  public age_group: number;

  @Column()
  public sinopse: string;

  @Column()
  public link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
