import { ProductEntity } from 'src/domain/product/entities/product.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.categories)
  product: ProductEntity;
}
