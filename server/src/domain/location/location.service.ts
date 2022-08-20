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

  async getDefault(): Promise<Location> {
    const tempLocation = this.locationRepository.create({ region: '역삼동' });
    let location = await this.locationRepository.findOneBy(tempLocation);

    if (!location) {
      location = await this.locationRepository.save(tempLocation);
    }

    return location;
  }
}
