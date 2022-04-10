import { Component, OnInit } from '@angular/core';
import { faUpload, faHome} from '@fortawesome/free-solid-svg-icons';
import { FileHandle } from '@cloudy/shared/utils';

@Component({
  selector: 'cloudy-home',
  templateUrl: './client-feature-home.component.html',
  styleUrls: ['./client-feature-home.component.scss']
})
export class HomeComponent implements OnInit {

  files: FileHandle[] = [];
  faUpload = faUpload;
  faHome = faHome;


  ngOnInit(): void {}


  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

}
