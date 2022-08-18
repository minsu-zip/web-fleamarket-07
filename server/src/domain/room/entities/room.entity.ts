import { UserEntity } from 'src/domain/user/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class RoomEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  sellerId: number;

  @Column({ type: 'int' })
  buyerId: number;

  @ManyToOne(() => UserEntity, (user) => user.sellerRooms)
  seller: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.buyerRooms)
  buyer: UserEntity;
}
