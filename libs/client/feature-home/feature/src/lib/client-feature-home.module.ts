import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './client-feature-home.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { SharedUiModule } from '@cloudy/shared/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonsFileDisplayerModule } from '@cloudy/commons/file-displayer';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilsModule,
    SharedUiModule,
    FontAwesomeModule,
    CommonsFileDisplayerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class ClientFeatureHomeModule {}
