import { Component, OnInit } from '@angular/core';
import { faUpload, faHome } from '@fortawesome/free-solid-svg-icons';
import { FileHandle } from '@cloudy/shared/utils';
import { FileService } from '@cloudy/client/shared';
import { FileItemResponse } from '@cloudy/shared/api';
import { HttpEventType } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cloudy-home',
  templateUrl: './client-feature-home.component.html',
  styleUrls: ['./client-feature-home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public fileService: FileService,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {}

  files: FileHandle[] = [];
  faUpload = faUpload;
  faHome = faHome;

  viewForbidden = false;
  showProgress: boolean = false;
  progressAmount: number = 0;

  ngOnInit(): void {
    this.fileService.getFiles().subscribe((files) => {
      this.fileService.fileItems$.next(files);
    }, (error) => {
      if(error.status === 403) {
        this.viewForbidden = true;
        this.toastr.error(this.translateService.instant('error.error-occured'));
      }
    });
  }

  //get total size of all files
  getTotalSize(files: FileHandle[]): number {
    let size = 0;
    for (const file of files) {
      size += file.file.size;
    }
    return size;
  }

  filesDropped(files: FileHandle[]): void {
    const totalFileSize = this.getTotalSize(files);
   if(totalFileSize >= 50000000) {
      this.toastr.error(this.translateService.instant('error.file-too-big'));
      return;
   }
    this.files = files;
    this.showProgress = true;
    this.fileService.upload(files).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total = event.total || totalFileSize;
          const percentDone = Math.round((100 * event.loaded) / total);
          this.progressAmount = percentDone;
        } else if (event.type === HttpEventType.Response) {
          this.showProgress = false;
          const items: FileItemResponse[] = event.body as FileItemResponse[];
          if (event.body) {
            this.fileService.fileItems$.getValue().push(...items);
            this.toastr.success(
              this.translateService.instant('commons.file-uploaded')
            );
          }
        }
      },
      (error) => {
        this.showProgress = false;
        if (error.error.message)
          this.toastr.error(this.translateService.instant(error.error.message));
        else
          this.toastr.error(
            this.translateService.instant('error.error-occured')
          );
      }
    );
  }
}
