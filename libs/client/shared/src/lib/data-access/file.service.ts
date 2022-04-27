import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { FILE_API } from '@cloudy/client/shared';
import { Observable } from 'rxjs';
import { FileItemResponse } from '@cloudy/shared/api';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //upload file
  upload(file: File): Observable<HttpEvent<FileItemResponse>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<FileItemResponse>(FILE_API, formData, { 
      reportProgress: true,
      observe: 'events'
    });
  }

  //get files
  getFiles(): Observable<FileItemResponse[]> {
    return this.http.get<FileItemResponse[]>(FILE_API + 'list');
  }
}
