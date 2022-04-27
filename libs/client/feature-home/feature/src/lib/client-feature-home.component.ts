import { Component, OnInit } from '@angular/core';
import { faUpload, faHome } from '@fortawesome/free-solid-svg-icons';
import { FileHandle } from '@cloudy/shared/utils';
import { FileService } from '@cloudy/client/shared';
import { FileItemResponse } from '@cloudy/shared/api';
import { BehaviorSubject, take } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'cloudy-home',
  templateUrl: './client-feature-home.component.html',
  styleUrls: ['./client-feature-home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private fileService: FileService) {}

  files: FileHandle[] = [];
  faUpload = faUpload;
  faHome = faHome;

  fileItems: BehaviorSubject<FileItemResponse[]> = new BehaviorSubject<FileItemResponse[]>([]);

  ngOnInit(): void {
    this.fileService.getFiles().subscribe((files) => {
      this.fileItems.next(files);
    });
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    this.fileService.upload(files[0].file).subscribe(
      (event) => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          const item: FileItemResponse = event.body as FileItemResponse;
          if (event.body) {
            this.fileItems.getValue().push(item);
          }
        }
      },
      (error) => {

        console.log(error);
      }
    );
  }
}
