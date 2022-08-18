import { Product } from 'src/domain/product/entities/product.entity';
import { User } from 'src/domain/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryColumn({ type: 'int' })
  productId: number;

  @PrimaryColumn({ type: 'int' })
  userId: number;

  @ManyToOne(() => Product, (product) => product.likes)
  product: Product;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
