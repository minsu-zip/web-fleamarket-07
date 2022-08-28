import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LocationService } from '../location/location.service';
import { TUserGithub } from '@fleamarket/common';
import { Response } from 'express';
import TLocation from '@fleamarket/common/dist/types/TLocation';

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

  async findByName(name: string, avatar?: string): Promise<TUserGithub> {
    let user = await this.userRepository.findOne({
      where: { name },
      relations: { location1: true, location2: true },
    });

    if (!user) {
      const location = await this.locationService.getDefault();
      const newUser = await this.userRepository.create({
        name,
        location1: location,
        avatar,
      });
      user = await this.userRepository.save(newUser);
    }

    const tokenUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      location1: user.location1,
      location2: user.location2,
    };

    return tokenUser;
  }

  async findLocation(id: number): Promise<TLocation[]> {
    try {
      const build = await this.userRepository
        .createQueryBuilder('u')
        .leftJoin('u.location1', 'location1')
        .leftJoin('u.location2', 'location2')
        .select(['u.id as id'].join(','))
        .addSelect(
          'location1.id as location1Id, location1.region as location1Name',
        )
        .addSelect(
          'location2.id as location2Id, location2.region as location2Name',
        )
        .groupBy('u.id')
        .where('u.id = :id', { id })
        .execute();

      return build;
    } catch (e) {
      throw new HttpException(
        '사용자 위치 정보를 찾을 수 없습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto): Promise<User> {
    const pureUser = await this.userRepository.findOneBy({ id });

    await this.userRepository.update(id, updateUserDto);
    return { ...pureUser, ...updateUserDto };
  }

  async logout(res: Response) {
    res.clearCookie('auth');
  }
}
