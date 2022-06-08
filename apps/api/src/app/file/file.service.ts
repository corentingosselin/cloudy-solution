import { UserToken, FileData, FileItemResponse } from '@cloudy/shared/api';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Observable } from 'rxjs';
import internal = require('stream');
import { CopyConditions } from 'minio';

@Injectable()
export class FileService {
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {}

  async upload(user: UserToken, files: any[]): Promise<FileItemResponse[]> {
    try {
      const uploadedFiles = await this.uploadFiles(files, user);
      return uploadedFiles;
    } catch (error) {
      if (error.message.includes('no space left on device')) {
        throw new HttpException(
          {
            status: 500,
            message: 'error.no-enough-space',
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      } else throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //upload files
  async uploadFiles(files: any[], user: UserToken) {
    const uploadedFiles: FileItemResponse[] = [];
    for (const file of files) {
      const item = await this.uploadFile(file, user);
      uploadedFiles.push(item);
    }
    return uploadedFiles;
  }

  async uploadFile(file: any, user: UserToken): Promise<FileItemResponse> {
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
    return item;
  }

  async listByUserId(userId: number) {
    const fileBucket = this.baseBucket;
    const filePrefix = userId + '/';
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

  //get user files
  async list(user: UserToken) {
    return this.listByUserId(user.userId);
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
    this.deleteByUserId(user.userId, file);
  }

  //delete file by user id
  async deleteByUserId(userId: number, file: string) {
    const fileBucket = this.baseBucket;
    const fileKey = userId + '/' + file;
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
    const fileTargetName = fileTarget.split('.').slice(0, -1).join('.');
    const fileDisplayName = fileTargetName + '_copy.' + fileExtension;
    const fileName = user.userId + '/' + fileDisplayName;
    const fileData = await this.client.statObject(fileBucket,fileKey);
    const size = fileData.size;





    const conds = new CopyConditions()
    const result = new Promise((resolve, reject) => {
      this.client.copyObject(fileBucket,   fileName,fileBucket + '/' + fileKey, conds, function(e, data) {
        if (e) {
          reject(e);
        }

        const item = {
          name: fileDisplayName,
          size: size,
          lastModified: new Date(),
          etag: data.etag,
          mimetype: fileTarget.split('.').pop(),
        };
    
        resolve(item);
      })
    })
    return result;
   

  }
}
