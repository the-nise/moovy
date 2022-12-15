import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Library, (library) => library.id)
  library: Promise<Library[]>;
}
