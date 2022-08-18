import { Product } from 'src/domain/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
