import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get('room/:id')
  findByRoom(@Param('id') id: string) {
    return this.chatService.findAllByRoom(+id);
  }
}
