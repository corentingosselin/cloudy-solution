import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropperDirective } from './dropper.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DropperDirective],
  exports: [DropperDirective],
})
export class SharedUtilsModule {}
