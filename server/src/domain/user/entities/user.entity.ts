import { LikeEntity } from 'src/domain/like/entities/like.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
