import { forwardRef, Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '../chat/chat.module';
import { RoomSocketService } from './room.socket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => ChatModule)],
  controllers: [RoomController],
  providers: [RoomService, RoomSocketService],
  exports: [RoomService, RoomSocketService],
})
export class RoomModule {}
