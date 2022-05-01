import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cloudy-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private authService: AuthentificationService) {}
  faInfoCircle = faInfoCircle;
  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
