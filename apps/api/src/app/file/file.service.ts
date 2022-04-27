import { UserToken, FileData, FileItemResponse } from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class FileService {
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {}

  async upload(user: UserToken, file: any): Promise<FileItemResponse> {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + file.originalname;
    const result = await this.client.putObject(
      fileBucket,
      fileKey,
      file.buffer
    );
    const item = {
      name: file.originalname,
      size: file.size,
      lastModified: new Date(),
      etag: result.etag,
    };
    return item;
  }

  //get user files
  async list(user: UserToken) {
    const fileBucket = this.baseBucket;
    const filePrefix = user.userId + '/';

    const files: FileItemResponse[] = await new Promise((resolve, reject) => {
      const tempFiles: FileItemResponse[] = [];
      const stream = this.client.listObjectsV2(fileBucket, filePrefix);
      stream.on('data', (obj) => {
        this.getUrlPreview(obj.name).then((url: string) => {
          tempFiles.push({
            ...obj,
            name: obj.name.split('/').pop(),
            preview_url: url,
          });
        });
      });
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
  async getUrlPreview(file: string): Promise<string> {
    const fileBucket = this.baseBucket;
    return new Promise((resolve, reject) => {
      this.client.presignedGetObject(fileBucket, file, 60, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  }

}
