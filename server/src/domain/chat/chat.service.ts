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

  async create(createUserDto: Chat): Promise<Chat> {
    const newUser = this.chatRepository.create(createUserDto);
    const user = await this.chatRepository.save(newUser);
    return user;
  }

  findAllByRoom(id: number): Promise<Chat[]> {
    return this.chatRepository.find({ where: { roomId: id } });
  }
}
