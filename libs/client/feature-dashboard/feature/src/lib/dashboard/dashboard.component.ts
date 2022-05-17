import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@cloudy/client/feature-dashboard/data-access';
import {faUserFriends, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faUserFriends = faUserFriends;
  faSearch = faSearch;
  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
   
  }
}
