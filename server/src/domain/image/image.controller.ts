import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
