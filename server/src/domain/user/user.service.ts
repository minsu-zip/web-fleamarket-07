import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LocationService } from '../location/location.service';
import {
  TLocationCreate,
  TLocationDelete,
  TUserGithub,
} from '@fleamarket/common';
import { Response } from 'express';
import { TLocation } from '@fleamarket/common';

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

    const { affected } = await this.userRepository.update(id, updateUserDto);
    if (affected <= 0)
      throw new HttpException(
        '위치 추가 : 사용자의 정보에 업데이트가 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { ...pureUser, ...updateUserDto };
  }

  async updateLocation(
    id: number,
    locationCreateDto: TLocationCreate,
  ): Promise<TLocation[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { location1: true, location2: true },
    });
    const { id: userId, location1, location2 } = user ?? {};

    const { id: secondLocation } = location2 ?? {};

    if (!userId)
      throw new HttpException(
        '위치 추가 : 사용자 정보가 없습니다',
        HttpStatus.BAD_REQUEST,
      );

    if (secondLocation)
      throw new HttpException(
        '위치 추가 : 사용자의 위치 정보가 이미 충분합니다.',
        HttpStatus.BAD_REQUEST,
      );

    const createdLocation2 = await this.locationService.createOrFind(
      locationCreateDto,
    );
    const { id: location2Id } = createdLocation2;
    await this.update(id, { location2Id });

    return [location1, createdLocation2];
  }

  async deleteLocation(id: number, locationDeleteDto: TLocationDelete) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { location1: true, location2: true },
    });
    const {
      id: userId,
      location1Id,
      location2Id,
      location1,
      location2,
    } = user ?? {};

    if (!userId)
      throw new HttpException(
        '위치 삭제 : 사용자 정보가 없습니다',
        HttpStatus.BAD_REQUEST,
      );

    if (!location2Id)
      throw new HttpException(
        '위치 삭제 : 사용자 위치 정보를 더 이상 지울 수 없습니다',
        HttpStatus.BAD_REQUEST,
      );

    const { id: deleteId } = locationDeleteDto;
    const newLocation1Id = deleteId === location1Id ? location2Id : location1Id;

    await this.update(id, { location1Id: newLocation1Id, location2Id: null });

    const newLocation = deleteId === location1Id ? location2 : location1;
    return [newLocation];
  }

  async logout(res: Response) {
    res.clearCookie('auth');
  }
}
