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

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOneBy({ id });
    return room;
  }

  findAllBy({ userId, productId }: { userId: number; productId?: number }) {
    const whereUser = `r.seller_id=${userId} OR r.buyer_id=${userId}`;

    return this.roomRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.product', 'product')
      .leftJoinAndSelect('r.seller', 'seller')
      .leftJoinAndSelect('r.buyer', 'buyer')
      .leftJoinAndMapOne(
        'r.lastChat',
        'r.chats',
        'lastChat',
        `lastChat.id = (SELECT MAX(id) FROM chat c WHERE c.room_id = r.id)`,
      )
      .leftJoinAndMapOne(
        'product.titleImage',
        'product.images',
        'titleImage',
        'titleImage.id = (SELECT MIN(id) FROM image i WHERE i.product_id = product.id LIMIT 1)',
      )
      .where(
        !!productId ? ` ${whereUser} AND product-id=${productId}` : whereUser,
      )
      .getMany();
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
