import { Component, Input, OnInit } from '@angular/core';
import { FileItemResponse } from '@cloudy/shared/api';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'cloudy-files-area',
  templateUrl: './files-area.component.html',
  styleUrls: ['./files-area.component.scss']
})
export class FilesAreaComponent implements OnInit {


  @Input() files?: Subject<FileItemResponse[]>;

  ngOnInit(): void {
  }

}
