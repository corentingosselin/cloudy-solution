import { UserToken, FileData, FileItemResponse } from '@cloudy/shared/api';
import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import internal = require('stream');

@Injectable()
export class FileService {
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {}

  async upload(user: UserToken, files: any[]): Promise<FileItemResponse[]> {
    const uploadedFiles = await this.uploadFiles(files, user);
    console.log(uploadedFiles);
    return uploadedFiles;
  }

  //upload files
  async uploadFiles(files: any[], user: UserToken) {
  
    files.forEach(async (file) => {
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
        mimetype: file.mimetype,
      };

    });
    return tempFiles;
  }
  
  async uploadFile(file: any, user: UserToken) {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + file.originalname;
    return this.client.putObject(
      fileBucket,
      fileKey,
      file.buffer
    );

  }
  //get user files
  async list(user: UserToken) {
    const fileBucket = this.baseBucket;
    const filePrefix = user.userId + '/';

    const files: FileItemResponse[] = await new Promise((resolve, reject) => {
      const tempFiles: FileItemResponse[] = [];
      const stream = this.client.extensions.listObjectsV2WithMetadata(
        fileBucket,
        filePrefix
      );
      stream.on('data', (obj) => {
        tempFiles.push({
          ...obj,
          name: obj.name.split('/').pop(),
          mimetype: obj.metadata['content-type'],
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
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  //duplicate file
  async duplicate(user: UserToken, fileTarget: string) {
    const fileBucket = this.baseBucket;
    const fileKey = user.userId + '/' + fileTarget;

    const fileExtension = fileTarget.split('.').pop();
    const FileTargetName = fileTarget.split('.').slice(0, -1).join('.');
    const fileDisplayName = FileTargetName + '_copy.' + fileExtension;
    const fileName = user.userId + '/' + fileDisplayName;
    console.log(fileName);
    let size = 0;

    const streamResult = await new Promise<internal.Readable>(
      (resolve, reject) => {
        this.client.getObject(fileBucket, fileKey, (err, data) => {
          data.on('data', function (chunk) {
            size += chunk.length;
          });

          data.on('error', reject);

          data.on('end', async function () {
            resolve(data);
          });
        });
      }
    );

    const result = await this.client.putObject(
      fileBucket,
      fileName,
      streamResult
    );

    const item = {
      name: fileDisplayName,
      size: size,
      lastModified: new Date(),
      etag: result.etag,
      mimetype: fileTarget.split('.').pop(),
    };

    return item;
  }
}
