import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  findByName(name: string) {
    return this.userRepository.findOneBy({ name });
  }

  async update(id: number, updateUserDto): Promise<User> {
    const pureUser = await this.userRepository.findOneBy({ id });

    await this.userRepository.update(id, updateUserDto);
    return { ...pureUser, ...updateUserDto };
  }
}
