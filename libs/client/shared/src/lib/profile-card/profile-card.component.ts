import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '@cloudy/shared/api';

@Component({
  selector: 'cloudy-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {

  @Input() userProfile?: UserProfile = {
    id: -1,
    email: 'demo@mail.com',
    firstname: 'demo',
    lastname: 'omed',
  };


  constructor() {}

  ngOnInit(): void {}
}
