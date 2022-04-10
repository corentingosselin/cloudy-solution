import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@cloudy/shared/ui';

import { AppComponent } from './app.component';

const routes: Routes = [
  //  {path: '', component: LoginComponent},
  {
    path: '',
    loadChildren: () =>
      import('@cloudy/client/feature-home/feature').then(
        (m) => m.ClientFeatureHomeModule
      ),
  },
  // {path: 'login', component: LoginComponent},
  //{path: 'register', component: RegisterComponent}
];
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedUiModule,RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
