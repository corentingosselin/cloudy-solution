import { Component, OnInit } from '@angular/core';
import { faUserCircle, faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cloudy-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  faUserCircle = faUserCircle;
  faHome = faHome;

  ngOnInit(): void {}

}
