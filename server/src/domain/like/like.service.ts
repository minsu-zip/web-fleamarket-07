import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {
    this.likeRepository = likeRepository;
  }

  async toggle(productId: number, userId: number): Promise<boolean> {
    const whereObject = { productId, userId };
    const like = await this.likeRepository.findOneBy(whereObject);

    if (like) await this.likeRepository.delete(whereObject);
    else await this.likeRepository.save(whereObject);

    return !like;
  }
}
