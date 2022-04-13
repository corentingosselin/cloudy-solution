import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cloudy-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent implements OnInit {


  @Input() error = "This is a very very very very very big error message";

  ngOnInit(): void {}

}
