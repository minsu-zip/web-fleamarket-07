import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
