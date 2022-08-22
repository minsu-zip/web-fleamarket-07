import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageFileService {
  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');
    const region = this.configService.get<string>('AWS_REGION');
    AWS.config.update({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadS3(file) {
    try {
      const { buffer: Body, originalname, mimetype: ContentType } = file;
      const splitString = originalname.split('.');
      const ext = `.${splitString[splitString.length - 1]}`;
      const name = splitString.slice(0, -1).join('.');

      const Key = `${name}${Date.now()}${ext}`;
      const Bucket = this.configService.get<string>('AWS_BUCKET_NAME');
      const s3 = new AWS.S3();
      const upload = await s3
        .upload({
          Key,
          Body,
          Bucket,
          ContentType,
        })
        .promise();

      return upload;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '사진 업로드 : S3 이미지 서비스 문제가 있습니다.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
