import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RoomEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  seller: number;

  @Column({ type: 'int' })
  buyer: number;
}
