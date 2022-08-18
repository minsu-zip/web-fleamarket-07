import { RoomEntity } from 'src/domain/room/entities/room.entity';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class ChatEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  roomId: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.chats)
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.chats)
  room: RoomEntity;
}
