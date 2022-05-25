import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCoreFeatureModule } from '@cloudy/client-core-feature';
import { AdminGuard, AuthGuard } from '@cloudy/client/feature-auth/data-access';
import { ClientFeatureAuthModule } from '@cloudy/client/feature-auth/feature';

const routes: Routes = [
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
      import('@cloudy/client-core-feature').then(
        (m) => m.ClientCoreFeatureModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    ClientFeatureAuthModule,
    ClientCoreFeatureModule,
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule {}
