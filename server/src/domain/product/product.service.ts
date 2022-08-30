import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import type { TProductAllQuery, TProductSummary } from '@fleamarket/common';
import { ImageFileService } from '../image/image.file.service';
import { ImageService } from '../image/image.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private imageService: ImageService,
    private readonly imageFileService: ImageFileService,
  ) {
    this.productRepository = productRepository;
  }

  async create(
    createProductDto: Product,
    files: Array<Express.Multer.File>,
  ): Promise<Product> {
    const { userId, title, price, content, locationId, categoryId } =
      createProductDto;

    const newProduct = await this.productRepository.save({
      title,
      price,
      content,
      userId,
      locationId,
      categoryId,
    });

    const url = await Promise.all(
      files.map((file) => this.imageFileService.uploadS3(file)),
    );

    url.map(async ({ Location }) => {
      return await this.imageService.create(newProduct.id, Location);
    });

    return newProduct;
  }

  async findAllByQuery(
    query: TProductAllQuery,
    filterUser = true,
  ): Promise<TProductSummary[]> {
    const { locationId, categoryId, userId, likeStatus } = query;

    try {
      const build = this.productRepository
        .createQueryBuilder('p')
        .leftJoin('p.rooms', 'room')
        .leftJoin('p.category', 'category')
        .leftJoin('p.user', 'user')
        .leftJoin('p.location', 'location')
        .leftJoin('p.likes', 'like')
        .leftJoin(
          'image',
          'image',
          'image.id = (SELECT i.id FROM image i WHERE i.product_id = p.id LIMIT 1)',
        )
        .select(
          [
            'p.id as id',
            'p.title as title',
            'p.price as price',
            'p.created_at as createdAt',
            'p.updated_at as updatedAt',
            'p.deleted_at as deletedAt',
          ].join(','),
        )
        .addSelect('user.id as userId, user.name as userName')
        .addSelect('location.id as locationId, location.region as locationName')
        .addSelect('category.name', 'categoryName')
        .addSelect('COUNT(room.id)', 'rooms')
        .addSelect('COUNT(like.product_id)', 'likes')
        .addSelect(`SUM(like.user_id = ${userId ? userId : -1})`, 'isLike')
        .addSelect('image.url', 'titleImage');

      if (locationId) {
        build.andWhere('p.locationId = :id', { id: locationId });
      }

      if (categoryId) {
        build.andWhere('p.categoryId = :categoryId', { categoryId });
      }

      // 나의 관심목록 / 내 판매목록 분기 처리
      if (likeStatus && userId) {
        build.andWhere('like.user_id = :userId', { userId });
      } else if (userId && filterUser) {
        build.andWhere('p.userId = :userId', { userId });
      }

      build.groupBy('p.id, image.id');
      build.orderBy({ 'p.created_at': 'DESC' });

      const data = await build.execute();

      return data as TProductSummary[];
    } catch (e) {
      throw new HttpException(
        '물품 요청 : 물품들을 찾는데 문제가 있습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number, userId?: number) {
    if (!userId) userId = 0;

    try {
      const product = await this.productRepository
        .createQueryBuilder('p')
        .leftJoin('p.rooms', 'room')
        .leftJoin('p.category', 'category')
        .leftJoin('p.user', 'user')
        .leftJoin('p.location', 'location')
        .leftJoin('p.likes', 'like')
        .innerJoin('p.images', 'images')
        .select(
          [
            'p.id as id',
            'p.title as title',
            'p.content as content',
            'p.price as price',
            'p.hit as hit',
            'p.status as status',
            'p.created_at as createdAt',
            'p.updated_at as updatedAt',
            'p.deleted_at as deletedAt',
          ].join(','),
        )
        .addSelect('user.id as userId, user.name as userName')
        .addSelect('location.id as locationId, location.region as locationName')
        .addSelect('category.id as categoryId, category.name as categoryName')
        .addSelect('COUNT(room.id)', 'rooms')
        .addSelect('COUNT(like.product_id)', 'likes')
        .addSelect(`SUM(like.user_id = ${userId})`, 'isLike')
        .addSelect('JSON_ARRAYAGG(images.url) as images')
        .where('p.id = :id', { id })
        .groupBy('p.id')
        .execute();

      if (product.length !== 1)
        throw {
          httpMessage: '물품 요청 : 존재하지 않는 물품입니다',
          status: HttpStatus.BAD_REQUEST,
        };

      return product[0];
    } catch ({ httpMessage, status }) {
      httpMessage = httpMessage ?? '물품 요청 : 물품을 찾는데 문제가 있습니다';
      const httpStatus = status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(httpMessage, httpStatus);
    }
  }

  findOneBasic(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto): Promise<Product> {
    const pureProduct = await this.productRepository.findOneBy({ id });
    const hit = pureProduct.hit + 1;

    await this.productRepository.update(id, { ...updateProductDto, hit });
    return { ...pureProduct, ...updateProductDto, hit };
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.productRepository.softDelete({ id });

    return result;
  }
}
