import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [ChatModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
