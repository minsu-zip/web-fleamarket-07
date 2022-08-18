import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {
    this.chatRepository = chatRepository;
  }

  async create(createUserDto: ChatEntity): Promise<ChatEntity> {
    const newUser = this.chatRepository.create(createUserDto);
    const user = await this.chatRepository.save(newUser);
    return user;
  }

  findAllByRoom(id: number): Promise<ChatEntity[]> {
    return this.chatRepository.find({ where: { roomId: id } });
  }
}
