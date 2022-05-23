import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cloudy-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {


  constructor() {}

  @Input() progress: number = 0;

  ngOnInit(): void {}
}
