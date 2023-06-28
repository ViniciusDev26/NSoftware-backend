import { Injectable } from '@nestjs/common';
import { UploadFiles3Provider } from './s3.service';

@Injectable()
export class ReturnImage {
  constructor(private readonly upload: UploadFiles3Provider) {}
  async returnImage(key: string) {
    const buffer = await this.upload.getImageByS3(key);
    return buffer;
  }
}
