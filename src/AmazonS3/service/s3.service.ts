import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

export interface UploaderFileParams {
  file: Buffer;
  originalname: string;
  filename: string;
  bucket: string;
  path: string;
}

export class UploadFiles3Provider {
  async upload(params: UploaderFileParams) {
    const region = 'sa-east-1';
    const S3_ACCESS_KEY_ID = 'AKIA4JCGKB2JHFB3ISUP';
    const S3_SECRET_ACCESS_KEY = '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';
    const bitmap = readFileSync(params.path);
    const buffer = Buffer.from(bitmap);

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
    });

    const filename = `documentUpload/${Date.now()} - ${params.originalname}`; // criar nome do arquivo para não sobrescrever

    const object = new PutObjectCommand({
      Bucket: 'mybucket-vinicius',
      Key: filename,
      Body: buffer, // Buffer do arquivo
    });

    await s3Client.send(object);

    return {
      filename,
      key: filename,
    };
  }

  async getImageByS3(key: string) {
    const region = 'sa-east-1';
    const S3_ACCESS_KEY_ID = 'AKIA4JCGKB2JHFB3ISUP';
    const S3_SECRET_ACCESS_KEY = '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';
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
    });

    const getImage = new GetObjectCommand({
      Bucket: 'mybucket-vinicius',
      Key: key,
    });

    const image = await s3Client.send(getImage);
    const bytes = await image.Body.transformToByteArray();
    return Buffer.from(bytes);
  }
}
