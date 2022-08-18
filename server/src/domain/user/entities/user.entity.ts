import { Chat } from 'src/domain/chat/entities/chat.entity';
import { Like } from 'src/domain/like/entities/like.entity';
import { Location } from 'src/domain/location/entities/location.entity';
import { Product } from 'src/domain/product/entities/product.entity';
import { Room } from 'src/domain/room/entities/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'int' })
  locationId1: number;

  @Column({ type: 'int' })
  locationId2: number;

  @ManyToOne(() => Location, (location) => location.users)
  @JoinColumn({ name: 'locationId1' })
  location1: Location;

  @ManyToOne(() => Location, (location) => location.subUsers)
  @JoinColumn({ name: 'locationId2' })
  location2: Location;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Room, (room) => room.seller)
  sellerRooms: Room[];

  @OneToMany(() => Room, (room) => room.seller)
  buyerRooms: Room[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
