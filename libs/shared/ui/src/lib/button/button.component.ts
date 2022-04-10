import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cloudy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() color = "#00262F";
  @Input() labelName  = 'Button';

  ngOnInit(): void {}

}
