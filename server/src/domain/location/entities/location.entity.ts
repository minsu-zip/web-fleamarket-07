import { Product } from 'src/domain/product/entities/product.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['region'])
export class Location {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  region: string;

  @OneToMany(() => User, (user) => user.location1)
  users: User[];

  @OneToMany(() => User, (user) => user.location2)
  subUsers: User[];

  @OneToMany(() => Product, (product) => product.location)
  products: Product[];
}
