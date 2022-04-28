import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileItemResponse } from '@cloudy/shared/api';
import { faFile, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../data-access/file.service';

@Component({
  selector: 'cloudy-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent implements OnInit {
  constructor(private fileService: FileService) {}

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
    this.fileService.getUrlPreview(this.fileItem?.name).subscribe((url) => {
       fetch(url.preview_url).then((res) => {
         res.blob().then((blob) => {
            let url = window.URL.createObjectURL(blob);
          });
      });
    });
  }

  delete(): void {}

  preview(): void {
    //open link in new tab
    if (!this.fileItem) return;
    this.fileService.getUrlPreview(this.fileItem?.name).subscribe(
      (url) => {
        window.open(url.preview_url, '_blank');
      },
      (error) => {
        console.log(error);
      }
    );
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
}
