import { Injectable } from '@nestjs/common';
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

  findAllByQuery(query: TProductAllQuery) {
    const { locationId, categoryId } = query;
    if (!categoryId) query = { locationId };

    return this.productRepository.find({ where: query });
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
