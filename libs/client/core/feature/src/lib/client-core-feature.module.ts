import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { SharedUiModule } from '@cloudy/shared/ui';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@cloudy/client/feature-home/feature').then(
            (m) => m.ClientFeatureHomeModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('@cloudy/client/feature-account/feature').then(
            (m) => m.AccountFeatureModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@cloudy/client/feature-dashboard/feature').then(
            (m) => m.DashboardFeatureModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@cloudy/client/feature-inventory/feature').then(
            (m) => m.InventoryFeatureModule
          ),
      },
    ],
  },
];
export const ROUTES = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    ROUTES,
    SharedUiModule,
  ],
  declarations: [LayoutComponent],
})
export class ClientCoreFeatureModule {}
