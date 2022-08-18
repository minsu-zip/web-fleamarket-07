import { LikeEntity } from 'src/domain/like/entities/like.entity';
import { LocationEntity } from 'src/domain/location/entities/location.entity';
import { ProductEntity } from 'src/domain/product/entities/product.entity';
import { RoomEntity } from 'src/domain/room/entities/room.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'int' })
  locationId1: number;

  @Column({ type: 'int' })
  locationId2: number;

  @ManyToOne(() => LocationEntity, (location) => location.users)
  @JoinColumn({ name: 'locationId1' })
  location1: LocationEntity;

  @ManyToOne(() => LocationEntity, (location) => location.subUsers)
  @JoinColumn({ name: 'locationId2' })
  location2: LocationEntity;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => RoomEntity, (room) => room.seller)
  sellerRooms: RoomEntity[];

  @OneToMany(() => RoomEntity, (room) => room.seller)
  buyerRooms: RoomEntity[];
}
