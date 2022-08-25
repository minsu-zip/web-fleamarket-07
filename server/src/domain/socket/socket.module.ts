import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [AuthModule, ChatModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
