import { Library } from './../library/library.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Library, (library) => library.review)
  library: Library;
}
