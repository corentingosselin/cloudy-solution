import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { FILE_API } from '@cloudy/client/shared';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileItemResponse } from '@cloudy/shared/api';
import { FileHandle } from '@cloudy/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  fileItems$: BehaviorSubject<FileItemResponse[]> = new BehaviorSubject<FileItemResponse[]>([]);

  //get file list by user id
  getFilesByUserId(userId: number): Observable<FileItemResponse[]> {
    return this.http.get<FileItemResponse[]>(FILE_API + 'list/' + userId);
  }

  //upload file
  upload(files: FileHandle[]): Observable<HttpEvent<FileItemResponse[]>> {
    let formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file.file, file.file.name);
    }); 
    return this.http.post<FileItemResponse[]>(FILE_API, formData, { 
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


  //get file preview url by userId
  getUrlPreviewByUserId(file: string, userId: number): Observable<{preview_url: string}> {
    return this.http.get<{preview_url: string}>(FILE_API + 'preview/' + file, {params: {user: userId}});
  }

  //get files
  getFiles(): Observable<FileItemResponse[]> {
    return this.http.get<FileItemResponse[]>(FILE_API + 'list');
  }

  //delete file
  delete(file: string): Observable<boolean> {
    return this.http.get<{deleted: boolean}>(FILE_API + 'delete/' + file).pipe(map(res => res.deleted));
  }

  //delete file by user id
  deleteByUserId(file: string, userId: number): Observable<boolean> {
    return this.http.get<{deleted: boolean}>(FILE_API + 'delete/' + file, {params: {user: userId}}).pipe(map(res => res.deleted));
  }

}
