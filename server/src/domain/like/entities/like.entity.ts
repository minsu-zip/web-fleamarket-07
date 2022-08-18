import { ProductEntity } from 'src/domain/product/entities/product.entity';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { Column, ManyToOne, PrimaryColumn } from 'typeorm';

export class LikeEntity {
  @PrimaryColumn()
  @Column({ type: 'int' })
  productId: number;

  @PrimaryColumn()
  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => ProductEntity, (product) => product.likes)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;
}
