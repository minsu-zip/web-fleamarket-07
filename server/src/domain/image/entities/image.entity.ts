import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int' })
  productId: number;
}
