import { MetricsResponse } from '@cloudy/shared/api';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class MonitoringService {
  constructor(private http: HttpService, private userService: UserService) {}

  private readonly METRICS_URL =
    'http://localhost:9000/minio/v2/metrics/cluster';

  private readonly MINIO_KEYS = [
    'minio_bucket_usage_object_total',
    'minio_bucket_usage_total_bytes',
    'minio_node_disk_free_bytes',
    'minio_node_disk_total_bytes',
    'minio_node_disk_used_bytes'
  ];

  async getMetrics(): Promise<MetricsResponse> {
    const userAmount = await this.userService.countUsers();
    const result = await lastValueFrom(
      this.http.get<any>(this.METRICS_URL).pipe(
        map((response) => response.data.split(/\r?\n/)),
        map((list) => list.filter((item) => !item.startsWith('#'))),
        map((list) => list.map((item) => item.replace(/{.*}/, ''))),
        map((list) =>
          list.filter((item) => this.MINIO_KEYS.includes(item.split(' ')[0]))
        ),
        //transform string list to dictionary
        map((list) =>
          list.reduce((acc, item) => {
            const [key, value] = item.split(' ');
            acc[key] = value;
            return acc;
          }, {})
        ),
        map((metrics) => {
          const total_size: string = this.bytesToSize(
            Number(metrics['minio_bucket_usage_total_bytes'])
          );
          return {
            total_files: metrics['minio_bucket_usage_object_total'],
            user_amount: userAmount,
            total_size,
            total_space: this.bytesToSize(metrics['minio_node_disk_total_bytes']),
            used_space: this.bytesToSize(metrics['minio_node_disk_used_bytes']),
          };
        })
      )
    );
    return result;
  }

  //bytes into readable size
  bytesToSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 Byte';
    }
    const i = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
      10
    );
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  }
}
