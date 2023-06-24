import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

export interface UploaderFileParams {
  file: Buffer;
  filePath: string;
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

    const filename = `${Date.now()} - ${params.filename}`; // criar nome do arquivo para não sobrescrever
    const path = `${params.filePath}/${filename}`; // concatenação do path com o filename para montar o caminho do arquivo

    const object = new PutObjectCommand({
      Bucket: 'mybucket-vinicius',
      Key: path,
      Body: buffer, // Buffer do arquivo
    });

    await s3Client.send(object);

    return {
      filename,
      key: path,
    };
  }
}
