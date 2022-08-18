import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.roomService.findAllByUser(+id);
  }

  @Get('product/:id')
  findByProduct(@Param('id') id: string) {
    return this.roomService.findAllByProduct(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
