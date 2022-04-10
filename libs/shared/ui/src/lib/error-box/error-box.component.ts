import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent implements OnInit {


  @Input() error: string = "This is a very very very very very big error message";

  constructor() { }

  ngOnInit(): void {
  }

}
