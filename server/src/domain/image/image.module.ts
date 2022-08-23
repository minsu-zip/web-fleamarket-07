import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageFileService } from './image.file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ImageFileService],
  exports: [ImageService, ImageFileService],
})
export class ImageModule {}
