import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropperDirective } from './dropper.directive';
import { GenericValidator } from './generic.validator';

@NgModule({
  imports: [CommonModule],
  declarations: [DropperDirective],
  exports: [GenericValidator],
})
export class SharedUtilsModule {}
