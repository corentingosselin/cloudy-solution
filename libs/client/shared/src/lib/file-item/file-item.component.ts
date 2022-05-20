import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileItemResponse } from '@cloudy/shared/api';
import { faFile, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../data-access/file.service';

@Component({
  selector: 'cloudy-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent implements OnInit {
  constructor(private fileService: FileService, private toastr: ToastrService, private translateService : TranslateService) {}

  faFile = faFile;
  faEllipsisH = faEllipsisH;

  @Input() fileItem?: FileItemResponse;

  fileNameDisplay = 'unknown';
  fileSizeDisplay = '? KB';
  fileFormat = '';
  tagColor = '#BD8800';

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  open(): void {
    this.dropdownMenu.nativeElement.style.display = 'flex';
  }

  close(): void {
    this.dropdownMenu.nativeElement.style.display = 'none';
  }

  download(): void {
    if (!this.fileItem) return;
    this.fileService
      .getUrlPreview(this.fileItem?.name)
      .subscribe(async (url) => {
        let link = url.preview_url;
        if (!this.fileItem?.mimetype.includes('octet-stream')) {
          const res = await fetch(link);
          let blob = await res.blob();
          blob = blob.slice(0, blob.size, 'application/octet-stream');
          link = window.URL.createObjectURL(blob);
        }
        window.open(link, '_blank');
        this.toastr.success(this.translateService.instant('commons.file-downloading'));

      });
  }

  delete(): void {
    if (!this.fileItem) return;
    this.fileService.delete(this.fileItem?.name).subscribe(
      (res) => {
        this.fileService.fileItems$
          .getValue()
          .splice(
            this.fileService.fileItems$.getValue().indexOf(this.fileItem!),
            1
          );
          this.toastr.success(this.translateService.instant('commons.file-deleted'));

      },
      (err) => {
        console.log(err);
      }
    );
  }

  preview() {
    //open link in new tab
    if (!this.fileItem) return;

    this.fileService.getUrlPreview(this.fileItem?.name).subscribe(
      async (url) => {
        let link = url.preview_url;

        const res = await fetch(link);
        let blob = await res.blob();
        blob = blob.slice(
          0,
          blob.size,
          this.getMimeTypeFromExtension(this.fileFormat)
        );
        link = window.URL.createObjectURL(blob);

        window.open(link, '_blank');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  duplicate(): void {
    if (!this.fileItem) return;
    this.fileService.duplicate(this.fileItem?.name).subscribe((res) => {
      console.log(res);
      this.fileService.fileItems$.getValue().push(res);
      this.toastr.success(this.translateService.instant('commons.file-duplicated'));

    });
  }

  ngOnInit(): void {
    if (!this.fileItem) return;

    let fileName = this.fileItem?.name;
    let fileSize = this.fileItem?.size;

    // get file format by name
    this.fileFormat = fileName.substring(fileName.lastIndexOf('.') + 1);

    if (fileName.length > 16) {
      this.fileNameDisplay = fileName.substring(0, 16) + '... ';
    } else this.fileNameDisplay = fileName;

    //KB MB GB of file size
    if (fileSize > 1024) {
      fileSize = fileSize / 1024;
      if (fileSize > 1024) {
        fileSize = fileSize / 1024;
        if (fileSize > 1024) {
          fileSize = fileSize / 1024;
          this.fileSizeDisplay = fileSize.toFixed(2) + ' GB';
        } else {
          this.fileSizeDisplay = fileSize.toFixed(2) + ' MB';
        }
      } else {
        this.fileSizeDisplay = fileSize.toFixed(2) + ' KB';
      }
    } else {
      this.fileSizeDisplay = fileSize + ' B';
    }

    //generator color by file file format
    let color = '#BD8800';
    switch (this.fileFormat) {
      case 'pdf':
        color = '#AF0000';
        break;
      case 'doc':
        color = '#004D94';
        break;
      case 'docx':
        color = '#004D94';
        break;
      case 'xls':
        color = '#149200';
        break;
      case 'xlsx':
        color = '#149200';
        break;
      case 'ppt':
        color = '#AD9C00';
        break;
      case 'pptx':
        color = '#AD9C00';
        break;
      case 'txt':
        color = '#A1A1A1';
        break;
      case 'zip':
        color = '#757000';
        break;
      case 'rar':
        color = '#757000';
        break;
      case 'jpg':
        color = '#009C64';
        break;
      case 'png':
        color = '#009C64';
        break;
      case 'gif':
        color = '#009C64';
        break;
      case 'bmp':
        color = '#00262F';
        break;
      case 'mp3':
        color = '#4E009C';
        break;
      case 'mp4':
        color = '#4E009C';
        break;
      case 'avi':
        color = '#4E009C';
        break;
      case 'flv':
        color = '#4E009C';
        break;
      case 'mkv':
        color = '#4E009C';
        break;
      case 'wmv':
        color = '#4E009C';
        break;
      case 'mov':
        color = '#4E009C';
        break;
      case 'mpg':
        color = '#4E009C';
        break;
      case 'mpeg':
        color = '#4E009C';
        break;
      case 'wav':
        color = '#4E009C';
        break;
    }
    this.tagColor = color;
  }

  getMimeTypeFromExtension(extension: string): string {
    let mimeType = 'application/octet-stream';
    switch (extension) {
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'docx':
        mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'xlsx':
        mimeType =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        mimeType =
          'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'zip':
        mimeType = 'application/zip';
        break;
      case 'rar':
        mimeType = 'application/x-rar-compressed';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'gif':
        mimeType = 'image/gif';
        break;
      case 'bmp':
        mimeType = 'image/bmp';
        break;
      case 'mp3':
        mimeType = 'audio/mpeg';
        break;
      case 'mp4':
        mimeType = 'video/mp4';
        break;
      case 'avi':
        mimeType = 'video/x-msvideo';
        break;
      case 'flv':
        mimeType = 'video/x-flv';
        break;
      case 'mkv':
        mimeType = 'video/x-matroska';
        break;
      case 'wmv':
        mimeType = 'video/x-ms-wmv';
        break;
      case 'mov':
        mimeType = 'video/quicktime';
        break;
      case 'mpg':
        mimeType = 'video/mpeg';
        break;
      case 'mpeg':
        mimeType = 'video/mpeg';
        break;
      case 'wav':
        mimeType = 'audio/x-wav';
        break;
      case 'yml':
        mimeType = 'text/yaml';
        break;
      case 'yaml':
        mimeType = 'text/yaml';
        break;
      case 'json':
        mimeType = 'application/json';
        break;
      case 'xml':
        mimeType = 'text/xml';
        break;
    }
    return mimeType;
  }
}
