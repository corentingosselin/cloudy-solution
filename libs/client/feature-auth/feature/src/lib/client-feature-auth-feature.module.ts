import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';

@NgModule({
  imports: [CommonModule, SharedUtilsModule],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent,RegisterComponent],
  providers: [AuthentificationService]
})
export class ClientFeatureAuthFeatureModule {}
