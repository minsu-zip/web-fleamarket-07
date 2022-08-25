import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EChatEvent, TChatConnect, TChatSending } from '@fleamarket/common';
import { ChatService } from './chat.service';

@Injectable()
export class ChatSocketService {
  constructor(private readonly chatService: ChatService) {}

  private logger: Logger = new Logger('Chat Socket');

  connectChat(client: Socket, { roomId }: TChatConnect) {
    this.logger.verbose(`CHAT-Connect : ${client.id}`);
    try {
      const roomCode = roomId.toString();

      client.leave(client.id);
      client.data.roomId = roomCode;
      client.join(roomCode);

      client.emit(EChatEvent.entered);
    } catch (e) {
      client.disconnect();
    }
  }

  disconnectChat(client: Socket) {
    this.logger.verbose(`CHAT-Disconnect : ${client.id}`);

    const { roomId } = client.data;
    client.to(roomId).emit(EChatEvent.leaving);
    client.leave(roomId);
  }

  sendChat(client: Socket, sendDto: TChatSending) {
    this.logger.verbose(`Chat Sending : ${JSON.stringify(sendDto)}`);

    const { roomId } = client.data;
    client.to(roomId).emit(EChatEvent.receive, sendDto);
  }
}
