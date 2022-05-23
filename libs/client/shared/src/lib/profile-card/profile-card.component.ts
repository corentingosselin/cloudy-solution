import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '@cloudy/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

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

  openInventory() {
    if (this.userProfile) {
      //Open in new tab
      window.open(
        `${window.location.origin}/inventory/${this.userProfile.id}`,
        '_blank'
      );
    } else {
      this.toastr.error(
        this.translateService.instant('error.couldnt-open-profile')
      );
    }
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}
}
