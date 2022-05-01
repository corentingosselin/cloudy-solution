import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { LoggedGuard } from '@cloudy/client/feature-auth/data-access';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedUiModule } from '@cloudy/shared/ui';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    SharedUiModule,
  ],
  declarations: [AccountComponent],
  exports: [AccountComponent],
})
export class AccountFeatureModule {}
