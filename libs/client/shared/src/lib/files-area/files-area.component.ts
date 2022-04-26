import { Component, Input, OnInit } from '@angular/core';
import { FileItemResponse } from '@cloudy/shared/api';

@Component({
  selector: 'cloudy-files-area',
  templateUrl: './files-area.component.html',
  styleUrls: ['./files-area.component.scss']
})
export class FilesAreaComponent implements OnInit {


  @Input() files: FileItemResponse[];

  ngOnInit(): void {}

}
