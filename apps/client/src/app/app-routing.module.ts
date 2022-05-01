import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFeatureModule } from '@cloudy/client/feature-account/feature';
import { AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { ClientFeatureAuthModule } from '@cloudy/client/feature-auth/feature';

const routes: Routes = [
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
      import('@cloudy/client/feature-auth/feature').then(
        (m) => m.ClientFeatureAuthModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('@cloudy/client/feature-account/feature').then(
        (m) => m.AccountFeatureModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    ClientFeatureAuthModule,
    AccountFeatureModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
