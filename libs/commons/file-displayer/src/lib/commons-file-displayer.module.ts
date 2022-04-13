import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItemComponent } from './file-item/file-item.component';
import { FilesAreaComponent } from './files-area/files-area.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FileItemComponent, FilesAreaComponent],
  exports: [FileItemComponent, FilesAreaComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class CommonsFileDisplayerModule {}
