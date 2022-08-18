import { ProductEntity } from 'src/domain/product/entities/product.entity';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  region: string;

  @OneToMany(() => UserEntity, (user) => user.location1)
  users: UserEntity[];

  @OneToMany(() => UserEntity, (user) => user.location2)
  subUsers: UserEntity[];

  @OneToMany(() => ProductEntity, (product) => product.location)
  products: ProductEntity[];
}
