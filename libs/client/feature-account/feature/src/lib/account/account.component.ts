import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { LoggedResponse } from '@cloudy/shared/api';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cloudy-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private authService: AuthentificationService) {}
  faInfoCircle = faInfoCircle;

  name: string = 'unknown';
  firstname: string = 'unknown';
  email: string = 'unknown';

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.name = user.lastname;
      this.firstname = user.firstname;
      this.email = user.email;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
