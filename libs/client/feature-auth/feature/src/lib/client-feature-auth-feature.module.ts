import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@cloudy/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUtilsModule,
    SharedUiModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthentificationService],
})
export class ClientFeatureAuthFeatureModule {}
