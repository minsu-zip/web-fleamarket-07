import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import * as jwt from 'jsonwebtoken';
import type { Algorithm, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  verifyToken(token) {
    try {
      const secretKey = this.configService.get<string>('JWT_KEY');
      const decodeResult = jwt.verify(token, secretKey);
      return decodeResult;
    } catch (error) {
      let message = '검증되지 않은 토큰입니다';
      if (error.name === 'TokenExpiredError') {
        message = '만료된 토큰입니다.';
      }

      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  signToken(data) {
    const expiresIn = this.configService.get<number>('JWT_EXP');
    const algorithm = this.configService.get<Algorithm>('JWT_ALG');
    const issuer = this.configService.get<string>('JWT_ISSUER');
    const options: SignOptions = { expiresIn, algorithm, issuer };

    const secretKey = this.configService.get<string>('JWT_KEY');
    const token = jwt.sign(data, secretKey, options);
    return token;
  }

  async attachGithubId(
    code: string,
  ): Promise<{ login: string; avatar: string }> {
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

    const userInfo = {
      login: userData.login,
      avatar: userData.avatar_url,
    };

    return userInfo;
  }
}
