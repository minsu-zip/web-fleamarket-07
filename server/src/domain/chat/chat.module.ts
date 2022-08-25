import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatSocketService } from './chat.socket.service';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), RoomModule],
  controllers: [ChatController],
  providers: [ChatService, ChatSocketService],
  exports: [ChatService, ChatSocketService],
})
export class ChatModule {}
