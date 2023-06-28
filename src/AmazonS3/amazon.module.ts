import { Module } from '@nestjs/common';
import { S3Controller } from './constroller/S3.controller';
import { ReturnImage } from './service/ReturnImage.service';
import { UploadFiles3Provider } from './service/s3.service';

@Module({
  providers: [UploadFiles3Provider, ReturnImage],
  controllers: [S3Controller],
})
export class AmazonModule {}
