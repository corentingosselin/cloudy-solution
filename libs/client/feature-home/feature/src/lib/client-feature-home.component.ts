import { Component, OnInit } from '@angular/core';
import { faUpload, faHome} from '@fortawesome/free-solid-svg-icons';
import { FileHandle } from '@cloudy/shared/utils';
import { FileService } from '@cloudy/client/shared';

@Component({
  selector: 'cloudy-home',
  templateUrl: './client-feature-home.component.html',
  styleUrls: ['./client-feature-home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fileService: FileService) {
    
  }

  files: FileHandle[] = [];
  faUpload = faUpload;
  faHome = faHome;

  ngOnInit(): void {}

  filesDropped(files: FileHandle[]): void {
    this.files = files;
    this.fileService.upload(files[0].file).subscribe(() => {
      console.log('uploaded');
    });
  }

}
