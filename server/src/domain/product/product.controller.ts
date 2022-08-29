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
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductService } from './product.service';
import type { TProductAllQuery, TUser } from '@fleamarket/common';
import { AuthGuard } from '../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { LikeService } from '../like/like.service';
import { AuthDataGuard } from '../auth/auth.data.guard';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly likeService: LikeService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  create(
    @Body() createProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productService.create(createProductDto, files);
  }

  @Get()
  @UseGuards(AuthDataGuard)
  async findAll(
    @Req() req: Request & { user: TUser },
    @Query() query: TProductAllQuery,
    @Res() res: Response,
  ) {
    const data = await this.productService.findAllByQuery(
      {
        ...query,
        userId: (req?.user ?? {}).id,
      },
      false,
    );
    return res.status(HttpStatus.OK).json({ products: data });
  }

  @Get('menu')
  @UseGuards(AuthGuard)
  async userMenu(@Query() query: TProductAllQuery, @Res() res: Response) {
    const data = await this.productService.findAllByQuery(query);
    return res.status(HttpStatus.OK).json({ products: data });
  }

  @Get(':id')
  @UseGuards(AuthDataGuard)
  async findOne(
    @Req() req: Request & { user: TUser },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    // TODO : User 정보 가져와서 id 넘겨주기
    const productId = Number(id);
    if (isNaN(productId) || productId < 0)
      throw new HttpException(
        '물품 요청 : 요청하려는 물품이 올바른가요?',
        HttpStatus.BAD_REQUEST,
      );

    await this.productService.update(+id, null);
    const data = await this.productService.findOne(+id, (req?.user ?? {}).id);
    return res.status(HttpStatus.OK).json({ product: data });
  }

  @Patch('like/:id')
  @UseGuards(AuthGuard)
  async likeProduct(
    @Req() req: Request & { user: TUser },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const data = await this.likeService.toggle(+id, req.user.id);
    return res.status(HttpStatus.OK).json({ isLike: data });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
