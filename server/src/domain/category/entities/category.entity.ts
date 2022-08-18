import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'int' })
  productId: number;
}
