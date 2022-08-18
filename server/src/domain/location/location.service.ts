import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    this.locationRepository = locationRepository;
  }

  async create(createLocationDto: Location): Promise<Location> {
    const newLocation = this.locationRepository.create(createLocationDto);
    const location = await this.locationRepository.save(newLocation);
    return location;
  }
}
