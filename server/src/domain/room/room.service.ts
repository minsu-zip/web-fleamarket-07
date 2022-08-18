import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {
    this.roomRepository = roomRepository;
  }

  async create(createRoomDto: Room): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomDto);
    const room = await this.roomRepository.save(newRoom);
    return room;
  }

  findAllByUser(id: number) {
    return this.roomRepository.find({ where: { sellerId: id } });
  }

  findAllByProduct(id: number) {
    return this.roomRepository.find({ where: { productId: id } });
  }

  async update(id: number, updateRoomDto): Promise<Room> {
    const pureRoom = await this.roomRepository.findOneBy({ id });

    await this.roomRepository.update(id, updateRoomDto);
    return { ...pureRoom, ...updateRoomDto };
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.roomRepository.delete({ id });

    return result;
  }
}
