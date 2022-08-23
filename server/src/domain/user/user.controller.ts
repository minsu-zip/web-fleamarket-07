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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  async loginGithub(@Query('code') code: string, @Res() res: Response) {
    if (!code) return res.status(HttpStatus.BAD_REQUEST).end();

    const userInfo = await this.authService.attachGithubId(code);
    const { id, name, avatar, location1, location2 } =
      await this.userService.findByName(userInfo.login, userInfo.avatar);

    const token = this.authService.signToken({
      id,
      name,
      avatar,
      location1,
      location2,
    });

    const maxAge = this.configService.get<number>('JWT_EXP');
    res.cookie('auth', token, {
      maxAge,
    });

    const FRONT_URL = this.configService.get<string>('FRONT_URL');
    return res.redirect(FRONT_URL);
  }

  @Post()
  create(@Body() createUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.userService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
