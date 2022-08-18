import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASS'),
      port: +this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
      synchronize: this.configService.get('NODE_ENV') === 'development',
      extra: {
        decimalNumbers: true,
      },
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
