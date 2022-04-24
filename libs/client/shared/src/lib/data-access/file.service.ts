import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FILE_API, fileHeaderOptions } from '@cloudy/client/shared';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //upload file
  async upload(file: any): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(FILE_API, formData, fileHeaderOptions);
  }
}
