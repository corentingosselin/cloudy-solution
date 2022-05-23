import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedUiModule } from '@cloudy/shared/ui';
import { ClientSharedModule } from '@cloudy/client/shared';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'inventory/:id',
    component: UserInventoryComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedUiModule,
    ClientSharedModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserInventoryComponent],
})
export class InventoryFeatureModule {}
