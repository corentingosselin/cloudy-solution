import { Logger, Module } from '@nestjs/common';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    MinioModule.register({
      endPoint: process.env.MINIO_ENDPOINT,
      port: Number(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {
  private readonly logger = new Logger(FileModule.name)
  constructor(private readonly minio: MinioService) {

    const client = minio.client;
    const bucket = process.env.MINIO_BUCKET;
    //create bucket if not exists
    client.bucketExists(bucket).then(exists => {
      if (!exists) {
        client.makeBucket(bucket,'france').then(() => {
          this.logger.log('Bucket ' + bucket + ' created successfully');
        }).catch(err => {
          this.logger.log('Error creating bucket: ', err);
        });
      }
    });
  }

}
