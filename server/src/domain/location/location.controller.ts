import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto) {
    return this.locationService.create(createLocationDto);
  }
}
