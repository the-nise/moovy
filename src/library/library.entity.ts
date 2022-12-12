import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Review } from '../reviews/reviews.entity';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie: string;

  @OneToMany(() => Review, (review) => review.library)
  review: Review[];

  @ManyToOne(() => User, (user) => user.library)
  user: User;
}
