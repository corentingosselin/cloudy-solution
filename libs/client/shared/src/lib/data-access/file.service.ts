import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { FILE_API } from '@cloudy/client/shared';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileItemResponse } from '@cloudy/shared/api';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  fileItems$: BehaviorSubject<FileItemResponse[]> = new BehaviorSubject<FileItemResponse[]>([]);


  //upload file
  upload(file: File): Observable<HttpEvent<FileItemResponse>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<FileItemResponse>(FILE_API, formData, { 
      reportProgress: true,
      observe: 'events'
    });
  }

  //duplicate file
  duplicate(file: string): Observable<FileItemResponse> {
    return this.http.post<FileItemResponse>(FILE_API + 'duplicate/' + file, {});
  }


  //get file preview url
  getUrlPreview(file: string): Observable<{preview_url: string}> {
    return this.http.get<{preview_url: string}>(FILE_API + 'preview/' + file);
  }

  //get files
  getFiles(): Observable<FileItemResponse[]> {
    return this.http.get<FileItemResponse[]>(FILE_API + 'list');
  }

  //delete file
  delete(file: string): Observable<boolean> {
    return this.http.get<{deleted: boolean}>(FILE_API + 'delete/' + file).pipe(map(res => res.deleted));
  }

}
