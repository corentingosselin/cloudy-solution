import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFeatureHomeModule } from '@cloudy/client/feature-home/feature';

const routes: Routes = [
//  {path: '', component: LoginComponent},
  {path: '', loadChildren: () => import('@cloudy/client/feature-home/feature').then(m => m.ClientFeatureHomeModule)},
 // {path: 'login', component: LoginComponent},
  //{path: 'register', component: RegisterComponent}
];

@NgModule({

  imports: [ClientFeatureHomeModule, AppRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
