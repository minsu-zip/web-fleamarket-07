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
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import type { TProductAllQuery } from '@fleamarket/common';
import { AuthGuard } from '../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  create(
    @Body() createProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productService.create(createProductDto, files);
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
    if (isNaN(productId) || productId < 0)
      throw new HttpException(
        '물품 요청 : 요청하려는 물품이 올바른가요?',
        HttpStatus.BAD_REQUEST,
      );

    const data = await this.productService.findOne(+id, undefined);
    return res.status(HttpStatus.OK).json({ product: data });
  }

  @Get('saleList/:userId')
  @UseGuards(AuthGuard)
  async userSaleList(@Param('userId') userId: number, @Res() res: Response) {
    const data = await this.productService.userSaleList(userId);
    return res.status(HttpStatus.OK).json({ userSaleList: data });
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
