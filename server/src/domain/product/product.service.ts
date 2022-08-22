import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import type { TProductAllQuery, TProductSummary } from '@fleamarket/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.productRepository = productRepository;
  }

  async create(createProductDto: Product): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    const product = await this.productRepository.save(newProduct);
    return product;
  }

  async findAllByQuery(
    query: TProductAllQuery,
    userId: number,
  ): Promise<TProductSummary[]> {
    const { locationId, categoryId } = query;
    if (!locationId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '물품 요청 : 잘못된 위치 아이디입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!categoryId) query = { locationId };
    if (!userId) userId = 0;

    try {
      const data = await this.productRepository
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
        .addSelect(`SUM(like.user_id = ${userId})`, 'isLike')
        .addSelect('image.url', 'titleImage')
        .where('p.locationId = :id', { id: locationId })
        .groupBy('p.id, image.id')
        .execute();

      return data as TProductSummary[];
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '물품 요청 : 물품을 찾는데 문제가 있습니다.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    return product;
  }

  async update(id: number, updateProductDto): Promise<Product> {
    const pureProduct = await this.productRepository.findOneBy({ id });

    await this.productRepository.update(id, updateProductDto);
    return { ...pureProduct, ...updateProductDto };
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.productRepository.delete({ id });

    return result;
  }
}
