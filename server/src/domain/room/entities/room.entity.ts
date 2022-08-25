import { Chat } from 'src/domain/chat/entities/chat.entity';
import { Product } from 'src/domain/product/entities/product.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  sellerId: number;

  @Column({ type: 'int' })
  buyerId: number;

  @ManyToOne(() => User, (user) => user.sellerRooms)
  seller: User;

  @ManyToOne(() => User, (user) => user.buyerRooms)
  buyer: User;

  @ManyToOne(() => Product, (product) => product.rooms)
  product: Product;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];

  lastChat: Chat;
}
