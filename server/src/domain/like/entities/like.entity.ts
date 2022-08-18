import { Column, PrimaryColumn } from 'typeorm';

export class LikeEntity {
  @PrimaryColumn()
  @Column({ type: 'int' })
  productId: number;

  @PrimaryColumn()
  @Column({ type: 'int' })
  userId: number;
}
