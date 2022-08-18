import { Room } from 'src/domain/room/entities/room.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
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

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @ManyToOne(() => Room, (room) => room.chats)
  room: Room;
}
