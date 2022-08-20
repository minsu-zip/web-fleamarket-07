import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  async loginGithub(@Query('code') code: string, @Res() res: Response) {
    if (!code) return res.status(HttpStatus.BAD_REQUEST).end();

    const userId = await this.userService.attachGithubId(code);
    await this.userService.verifyUser(userId);

    const FRONT_URL = this.configService.get<string>('FRONT_URL');
    return res.redirect(FRONT_URL);
  }

  @Post()
  create(@Body() createUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('test')
  async test(@Res() res: Response) {
    const data = await this.userService.verifyUser('hi');
    return res.send(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
