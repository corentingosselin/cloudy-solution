import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FILE_API } from '@cloudy/client/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //upload file
  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Blob>(FILE_API, formData, { 
      reportProgress: true,
      observe: 'events'
    });
  }
}
