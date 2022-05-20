import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';

@Component({
  selector: 'cloudy-home-wrapper',
  templateUrl: './home-wrapper.component.html',
  styleUrls: ['./home-wrapper.component.scss'],
})
export class HomeWrapperComponent implements OnInit {
  constructor(private authService: AuthentificationService) {}


  isAdmin = this.authService.isAdmin();
  ngOnInit(): void {

  }
}
