import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileItemComponent } from './file-item/file-item.component';
import { FilesAreaComponent } from './files-area/files-area.component';
import { FileService } from './data-access/file.service';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  declarations: [
    FileItemComponent,
    FilesAreaComponent,
    ProfileCardComponent,
    ProgressBarComponent,
  ],
  exports: [FileItemComponent, FilesAreaComponent, ProfileCardComponent, ProgressBarComponent],
  providers: [FileService],
})
export class ClientSharedModule {}
