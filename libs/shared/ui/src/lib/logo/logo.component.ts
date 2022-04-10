import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cloudy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() width = '10';
  @Input() size =  '7';
  @Input() title = 'Cloudy'

  ngOnInit(): void {
    this.size = (+this.width - 3).toString();
  }

}
