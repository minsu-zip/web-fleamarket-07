import { CategoryEntity } from 'src/domain/category/entities/category.entity';
import { ImageEntity } from 'src/domain/image/entities/image.entity';
import { LikeEntity } from 'src/domain/like/entities/like.entity';
import { LocationEntity } from 'src/domain/location/entities/location.entity';
import { RoomEntity } from 'src/domain/room/entities/room.entity';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  hit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  locationId: number;

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;

  @ManyToOne(() => LocationEntity, (location) => location.products)
  location: LocationEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => ImageEntity, (image) => image.product)
  images: ImageEntity[];

  @OneToMany(() => LikeEntity, (like) => like.product)
  likes: LikeEntity[];

  @OneToMany(() => RoomEntity, (room) => room.product)
  rooms: RoomEntity[];
}
