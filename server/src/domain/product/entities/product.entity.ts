import { LikeEntity } from 'src/domain/like/entities/like.entity';
import { LocationEntity } from 'src/domain/location/entities/location.entity';
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

  @OneToMany(() => LikeEntity, (like) => like.product)
  likes: LikeEntity[];

  @ManyToOne(() => LocationEntity, (location) => location.products)
  location: LocationEntity;
}
