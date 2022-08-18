import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {
    this.likeRepository = likeRepository;
  }

  async create(productId: number, userId: number): Promise<LikeEntity> {
    const newLike = this.likeRepository.create({ productId, userId });
    const like = await this.likeRepository.save(newLike);
    return like;
  }

  async remove(productId: number, userId: number): Promise<DeleteResult> {
    const result = await this.likeRepository.delete({ productId, userId });
    return result;
  }
}
