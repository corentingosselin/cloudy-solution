import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from './auth.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [authInterceptorProviders],
})
export class ClientFeatureAuthSharedUtilsModule {}
