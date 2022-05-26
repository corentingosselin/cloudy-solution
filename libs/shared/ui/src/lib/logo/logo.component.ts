import { Component, Input, OnInit } from '@angular/core';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cloudy-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  faCloud = faCloud;
  @Input() title = 'Cloudy'

  ngOnInit(): void {
  }

}
