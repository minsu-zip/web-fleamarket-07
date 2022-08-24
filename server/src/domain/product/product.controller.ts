import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import type { TProductAllQuery } from '@fleamarket/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: TProductAllQuery, @Res() res: Response) {
    // TODO : User 정보를 가져와서 id 넘겨주기
    const data = await this.productService.findAllByQuery(query, undefined);
    return res.status(HttpStatus.OK).json({ products: data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    // TODO : User 정보 가져와서 id 넘겨주기
    const productId = Number(id);
    if (isNaN(productId))
      res.status(HttpStatus.BAD_REQUEST).json({
        message: '물품 요청 : 요청하려는 물품이 올바른가요?',
        status: HttpStatus.BAD_REQUEST,
      });

    const data = await this.productService.findOne(+id, undefined);
    return res.status(HttpStatus.OK).json({ product: data });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
