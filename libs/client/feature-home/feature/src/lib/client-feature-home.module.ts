import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './client-feature-home.component';
import { SharedUtilsModule } from '@cloudy/shared/utils';
import { SharedUiModule } from '@cloudy/shared/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileItemComponent } from './file-item/file-item.component';
import { FilesAreaComponent } from './files-area/files-area.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilsModule,
    SharedUiModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent, FilesAreaComponent, FileItemComponent],
})
export class ClientFeatureHomeModule {}
