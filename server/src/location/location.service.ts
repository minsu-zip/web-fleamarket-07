import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {
    this.locationRepository = locationRepository;
  }

  async create(createLocationDto: LocationEntity): Promise<LocationEntity> {
    const newLocation = this.locationRepository.create(createLocationDto);
    const location = await this.locationRepository.save(newLocation);
    return location;
  }
}
