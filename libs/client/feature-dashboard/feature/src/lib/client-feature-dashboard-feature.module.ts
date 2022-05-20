import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard, AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedUiModule } from '@cloudy/shared/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDataAccessModule } from '@cloudy/client/feature-dashboard/data-access';
import { ClientSharedModule } from '@cloudy/client/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    SharedUiModule,
    FormsModule,
    ReactiveFormsModule,
    ClientSharedModule,
    TranslateModule,
    DashboardDataAccessModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardFeatureModule {}