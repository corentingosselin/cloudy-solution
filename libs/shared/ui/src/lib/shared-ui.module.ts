import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogoComponent,
    SlidebarComponent,
    ErrorBoxComponent,
    InputComponent,
    ButtonComponent
  ],
  exports: [
    LogoComponent,
    SlidebarComponent,
    ErrorBoxComponent,
    InputComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule
  ],
})
export class SharedUiModule {}
