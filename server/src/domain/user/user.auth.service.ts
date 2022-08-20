import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly configService: ConfigService,
  ) {}

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
