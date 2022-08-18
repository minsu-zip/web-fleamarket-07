import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
    this.imageRepository = imageRepository;
  }

  async create(createImageDto: Image): Promise<Image> {
    const newImage = this.imageRepository.create(createImageDto);
    const image = await this.imageRepository.save(newImage);
    return image;
  }

  async update(id: number, updateImageDto): Promise<Image> {
    const pureImage = await this.imageRepository.findOneBy({ id });

    await this.imageRepository.update(id, updateImageDto);
    return { ...pureImage, ...updateImageDto };
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.imageRepository.delete({ id });

    return result;
  }
}
