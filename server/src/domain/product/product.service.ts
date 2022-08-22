import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import type { TProductAllQuery } from '@fleamarket/common';

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

  async findAllByQuery(query: TProductAllQuery) {
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

    try {
      const data = await this.productRepository.find({ where: query });
      return data;
    } catch (e) {
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
