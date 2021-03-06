import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedUiModule } from '@cloudy/shared/ui';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    SharedUiModule,
    TranslateModule
  ],
  declarations: [AccountComponent],
  exports: [AccountComponent],
})
export class AccountFeatureModule {}
