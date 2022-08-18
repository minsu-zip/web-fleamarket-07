import { LikeEntity } from 'src/domain/like/entities/like.entity';
import { LocationEntity } from 'src/domain/location/entities/location.entity';
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

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @ManyToOne(() => LocationEntity, (location) => location.users)
  @JoinColumn({ name: 'locationId1' })
  location1: LocationEntity;

  @ManyToOne(() => LocationEntity, (location) => location.subUsers)
  @JoinColumn({ name: 'locationId2' })
  location2: LocationEntity;
}
