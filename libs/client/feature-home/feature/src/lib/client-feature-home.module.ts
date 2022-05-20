import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './client-feature-home.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { SharedUiModule } from '@cloudy/shared/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ClientSharedModule } from '@cloudy/client/shared';
import { TranslateModule } from '@ngx-translate/core';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { DashboardFeatureModule } from '@cloudy/client/feature-dashboard/feature';

const routes: Routes = [{ path: '', component: HomeWrapperComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedUtilsModule,
    TranslateModule,
    SharedUiModule,
    FontAwesomeModule,
    ClientSharedModule,
    DashboardFeatureModule
  ],
  declarations: [HomeComponent, HomeWrapperComponent],
  providers: [],
})
export class ClientFeatureHomeModule {}
