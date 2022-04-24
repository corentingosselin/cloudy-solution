import { UserToken, FileData } from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class FileService {
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {}

  //upload file to minio server
  async upload(user: UserToken, file: any) {
    const fileName = file.originalname;
    const fileType = file.mimetype;
    const filePath = file.path;
    const fileSize = file.size;
    const fileBucket = this.baseBucket;
    const fileKey = fileName;
    const fileMetadata = {
      'Content-Type': fileType,
      'Content-Length': fileSize,
    };
    await this.client.putObject(
      fileBucket,
      user.userId + '/' + fileKey,
      file.buffer,
      fileMetadata
    );
    return fileKey;
  }

  //get user files
  async list(user: UserToken) {
    const fileBucket = this.baseBucket;
    const filePrefix = user.userId + '/';

    const files: FileData[] = await new Promise((resolve, reject) => {
      const tempFiles: FileData[] = [];
      const stream = this.client.listObjectsV2(fileBucket, filePrefix);
      stream.on('data', (obj) =>
        tempFiles.push({
          ...obj,
          name: obj.name.split('/').pop(),
        })
      );
      stream.on('error', reject);
      stream.on('end', () => resolve(tempFiles));
    });
    return files;
  }

  //download files from minio server
  async download(user: UserToken, file: string) {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + file;
    const fileStream = this.client.getObject(fileBucket, fileKey);
    return fileStream;
  }

  //delete files from minio server
  async delete(user: UserToken, file: string) {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + file;
    await this.client.removeObject(fileBucket, fileKey);
  }

  //get url image from minio server
  async getUrlPreview(user: UserToken, file: string) {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + file;
    const url = await new Promise((resolve, reject) => {
      this.client.presignedGetObject(fileBucket, fileKey, 60, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
    return url; 
  }
}
