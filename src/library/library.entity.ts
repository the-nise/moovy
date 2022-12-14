import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie: string;

  @Column()
  hasReview: boolean;

  @Column({ nullable: true })
  audioFilePath: string;

  @Column({ nullable: true })
  syncStatus: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne(() => User, (user) => user.library)
  @JoinColumn()
  user: User;
}
