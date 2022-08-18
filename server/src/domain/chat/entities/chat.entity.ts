import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
