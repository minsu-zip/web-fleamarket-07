import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { MySqlConfigModule } from './config/database/config.module';
import { MySqlConfigService } from './config/database/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './domain/location/location.module';
import { UserModule } from './domain/user/user.module';
import { ProductModule } from './domain/product/product.module';
import { CategoryModule } from './domain/category/category.module';
import { ImageModule } from './domain/image/image.module';
import { RoomModule } from './domain/room/room.module';
import { ChatModule } from './domain/chat/chat.module';
import { LikeModule } from './domain/like/like.module';

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
    LocationModule,
    UserModule,
    ProductModule,
    CategoryModule,
    ImageModule,
    RoomModule,
    ChatModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
