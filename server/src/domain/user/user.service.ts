import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LocationService } from '../location/location.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly locationService: LocationService,
  ) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: User): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return user;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<User> {
    let user = await this.userRepository.findOneBy({ name });

    if (!user) {
      const location = await this.locationService.getDefault();
      const newUser = await this.userRepository.create({
        name,
        location1: location,
      });
      user = await this.userRepository.save(newUser);
    }

    return user;
  }

  async update(id: number, updateUserDto): Promise<User> {
    const pureUser = await this.userRepository.findOneBy({ id });

    await this.userRepository.update(id, updateUserDto);
    return { ...pureUser, ...updateUserDto };
  }
}
