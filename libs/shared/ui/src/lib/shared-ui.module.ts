import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlidebarComponent } from './slidebar/slidebar.component';

@NgModule({
  declarations: [
    LogoComponent,
    SlidebarComponent
  ],
  exports: [
    LogoComponent,
    SlidebarComponent
  ],
  imports: [CommonModule,FontAwesomeModule],
})
export class SharedUiModule {}
