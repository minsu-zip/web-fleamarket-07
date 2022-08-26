import { Category } from 'src/domain/category/entities/category.entity';
import { Image } from 'src/domain/image/entities/image.entity';
import { Like } from 'src/domain/like/entities/like.entity';
import { Location } from 'src/domain/location/entities/location.entity';
import { Room } from 'src/domain/room/entities/room.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus, EProductStatus } from '@fleamarket/common';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  hit: number;

  @Column({ type: 'enum', enum: Object.values(ProductStatus) })
  status: EProductStatus;

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

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Location, (location) => location.products)
  location: Location;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @OneToMany(() => Like, (like) => like.product)
  likes: Like[];

  @OneToMany(() => Room, (room) => room.product)
  rooms: Room[];

  titleImage: Image;
}
