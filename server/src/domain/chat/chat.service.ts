import { TChat } from '@fleamarket/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {
    this.chatRepository = chatRepository;
  }

  async create(createChatDto: Omit<TChat, 'id'>): Promise<TChat> {
    try {
      const newChat = this.chatRepository.create(createChatDto);
      const chat = await this.chatRepository.save(newChat);
      return chat;
    } catch (e) {
      throw Error('채팅 오류 : Chat Database 생성에 문제가 있습니다.');
    }
  }

  findAllByRoom(id: number): Promise<Chat[]> {
    return this.chatRepository.find({
      where: { roomId: id },
      select: ['id', 'content', 'createdAt', 'userId'],
    });
  }
}
