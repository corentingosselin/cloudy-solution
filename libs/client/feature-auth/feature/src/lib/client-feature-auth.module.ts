import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@cloudy/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoggedGuard } from '@cloudy/client/feature-auth/data-access';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedUtilsModule,
    SharedUiModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [LoggedGuard],
})
export class ClientFeatureAuthModule {}
