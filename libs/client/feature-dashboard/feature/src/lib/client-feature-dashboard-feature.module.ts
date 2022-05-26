import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { ClientSharedModule } from '@cloudy/client/shared';
import { SharedUiModule } from '@cloudy/shared/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    TranslateModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardFeatureModule {}