import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EChatEvent, TChatConnect, TChatSending } from '@fleamarket/common';
import { ChatService } from './chat.service';
import { WsException } from '@nestjs/websockets';
import { RoomService } from '../room/room.service';

@Injectable()
export class ChatSocketService {
  constructor(
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
  ) {}

  private logger: Logger = new Logger('Chat Socket');

  async connectChat(client: Socket, { roomId }: TChatConnect) {
    this.logger.verbose(`CHAT-Connect : ${client.id}`);
    try {
      const roomCode = roomId.toString();

      client.leave(client.id);

      const data = await this.roomService.findOne(roomId);
      if (!data) throw Error('채팅 연결 오류 : 올바른 채팅에 접근해주세요.');
      if (
        !(
          client.data.userId === data.buyerId ||
          client.data.userId === data.sellerId
        )
      )
        throw Error('채팅 연결 오류 : 참가 하고 있는 채팅에 접근해주세요.');

      client.data.roomId = roomCode;
      client.join(roomCode);

      client.emit(EChatEvent.entered);
    } catch ({ message }) {
      throw new WsException(
        message ?? '채팅 연결 오류 : 서버 데이터에 문제가 있습니다.',
      );
    }
  }

  disconnectChat(client: Socket) {
    this.logger.verbose(`CHAT-Disconnect : ${client.id}`);

    const { roomId } = client.data;
    client.to(roomId).emit(EChatEvent.leaving);
    client.leave(roomId);
  }

  async sendChat(client: Socket, sendDto: TChatSending) {
    this.logger.verbose(`Chat Sending : ${JSON.stringify(sendDto)}`);

    const { content } = sendDto;
    const { roomId, userId } = client.data;
    try {
      const newChat = await this.chatService.create({
        content,
        roomId,
        userId,
      });
      delete newChat['roomId'];
      client.to(roomId).emit(EChatEvent.receive, newChat);
    } catch ({ message }) {
      throw new WsException(message);
    }
  }
}
