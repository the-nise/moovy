import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Library } from '../library/library.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isOwner: boolean;

  @OneToOne(() => Library, (library) => library.id)
  library: Library[];
}
