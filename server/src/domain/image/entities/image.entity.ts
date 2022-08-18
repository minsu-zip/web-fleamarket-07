import { ProductEntity } from 'src/domain/product/entities/product.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
