import { Product } from 'src/domain/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
