import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
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

  @OneToOne(() => User, (user) => user.library)
  @JoinColumn()
  user: User;
}
