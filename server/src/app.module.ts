import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { validateEnv } from './config/env.validation';
import { MySqlConfigModule } from './config/database/config.module'
import { MySqlConfigService } from './config/database/config.service'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validateEnv,
    }),
      TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
