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
  HttpException,
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
    const { locationId } = query;
    if (!locationId)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '물품 요청 : 잘못된 위치 아이디입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );

    const data = await this.productService.findAllByQuery(query);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
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
