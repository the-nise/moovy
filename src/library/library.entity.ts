import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Movie } from '../models/movie.model'

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToMany(type => Movie)
  @Column()
  movies: Movie[];

  @Column()
  addedOn: Date;

  @OneToMany(type => Review, review => review.movie)
  reviews: Review[];
}