import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faFile, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cloudy-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {
  faFile = faFile;
  faEllipsisH = faEllipsisH;

  @Input() fileName = "file.pdf";
  @Input() fileSizeInput = '';
  fileSizeDisplay = "0 KB";
  fileFormat = "pdf";
  tagColor = "#BD8800";

  @ViewChild('dropdownMenu') dropdownMenu! : ElementRef;

  open() : void {
    this.dropdownMenu.nativeElement.style.display = "flex";
  }

  close() : void {
    this.dropdownMenu.nativeElement.style.display = "none";

  }

  ngOnInit(): void {

    // get file format by name 
    this.fileFormat = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);
  
    if (this.fileName.length > 16) {
      this.fileName = this.fileName.substring(0, 16) + "... ";
    }

    let fileSize: number = +this.fileSizeInput;
    //KB MB GB of file size
    if (fileSize > 1024) {
      fileSize = fileSize / 1024;
      if (fileSize > 1024) {
        fileSize = fileSize / 1024;
        if (fileSize > 1024) {
          fileSize = fileSize / 1024;
          this.fileSizeDisplay = fileSize.toFixed(2) + " GB";
        } else {
          this.fileSizeDisplay = fileSize.toFixed(2) + " MB";
        }
      } else {
        this.fileSizeDisplay = fileSize.toFixed(2) + " KB";
      }
    }

    //generator color by file file format
    let color = "#BD8800";
    switch (this.fileFormat) {
      case "pdf":
        color = "#AF0000";
        break;
      case "doc":
        color = "#004D94";
        break;
      case "docx":
        color = "#004D94";
        break;
      case "xls":
        color = "#149200";
        break;
      case "xlsx":
        color = "#149200";
        break;
      case "ppt":
        color = "#AD9C00";
        break;
      case "pptx":
        color = "#AD9C00";
        break;
      case "txt":
        color = "#A1A1A1";
        break;
      case "zip":
        color = "#757000";
        break;
      case "rar":
        color = "#757000";
        break;
      case "jpg":
        color = "#009C64";
        break;
      case "png":
        color = "#009C64";
        break;
      case "gif":
        color = "#009C64";
        break;
      case "bmp":
        color = "#00262F";
        break;
      case "mp3":
        color = "#4E009C";
        break;
      case "mp4":
        color = "#4E009C";
        break;
      case "avi":
        color = "#4E009C";
        break;
      case "flv":
        color = "#4E009C";
        break;
      case "mkv":
        color = "#4E009C";
        break;
      case "wmv":
        color = "#4E009C";
        break;
      case "mov":
        color = "#4E009C";
        break;
      case "mpg":
        color = "#4E009C";
        break;
      case "mpeg":
        color = "#4E009C";
        break;
      case "wav":
        color = "#4E009C";
        break;
    }
    this.tagColor = color;
  }

}
