import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileItemComponent } from './file-item/file-item.component';
import { FilesAreaComponent } from './files-area/files-area.component';
import { FileService } from './data-access/file.service';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [FileItemComponent, FilesAreaComponent, ProfileCardComponent],
  exports: [FileItemComponent, FilesAreaComponent,ProfileCardComponent],
  providers: [FileService],
})
export class ClientSharedModule {}
