import { Module } from '@nestjs/common';
import { UploadFiles3Provider } from './service/s3.service';

@Module({
  providers: [UploadFiles3Provider],
})
export class AmazonModule {}
