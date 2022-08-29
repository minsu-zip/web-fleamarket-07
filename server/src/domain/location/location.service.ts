import { TLocationCreate } from '@fleamarket/common';
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

  async createOrFind({ region }: TLocationCreate): Promise<Location> {
    let location = await this.locationRepository.findOneBy({ region });

    if (!location) {
      const newLocation = await this.locationRepository.create({ region });
      location = await this.locationRepository.save(newLocation);
    }

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
