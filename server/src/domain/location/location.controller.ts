import { TLocationCreate, TLocationDelete, TUser } from '@fleamarket/common';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() req: Request & { user: TUser },
    @Body() createLocationDto: TLocationCreate,
    @Res() res: Response,
  ) {
    const locations = await this.userService.updateLocation(
      req.user.id,
      createLocationDto,
    );
    return res.status(HttpStatus.OK).json({ locations });
  }

  @Delete()
  @UseGuards(AuthGuard)
  async delete(
    @Req() req: Request & { user: TUser },
    @Body() deleteLocationDto: TLocationDelete,
    @Res() res: Response,
  ) {
    const locations = await this.userService.deleteLocation(
      req.user.id,
      deleteLocationDto,
    );
    return res.status(HttpStatus.OK).json({ locations });
  }
}
