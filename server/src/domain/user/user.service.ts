import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import axios, { AxiosResponse } from 'axios';
import { LocationService } from '../location/location.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
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

  findByName(name: string) {
    return this.userRepository.findOneBy({ name });
  }

  async update(id: number, updateUserDto): Promise<User> {
    const pureUser = await this.userRepository.findOneBy({ id });

    await this.userRepository.update(id, updateUserDto);
    return { ...pureUser, ...updateUserDto };
  }

  async verifyUser(name: string): Promise<User> {
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

  async attachGithubId(code: string): Promise<string> {
    const accessUrl = 'https://github.com/login/oauth/access_token';
    const accessBody = {
      code,
      client_id: this.configService.get<string>('GITHUB_ID'),
      client_secret: this.configService.get<string>('GITHUB_SECRET'),
    };
    const accessOptions = {
      headers: { accept: 'application/json' },
    };
    const { data: access_data }: AxiosResponse = await axios.post(
      accessUrl,
      accessBody,
      accessOptions,
    );

    if (access_data.error) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: '깃허브 인증 실패' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { access_token } = access_data;
    const userUrl = 'https://api.github.com/user';
    const { data: userData }: AxiosResponse = await axios.get(userUrl, {
      headers: { Authorization: `token ${access_token}` },
    });

    const { login }: { login: string } = userData;

    return login;
  }
}
