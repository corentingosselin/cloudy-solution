import { Component } from '@angular/core';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cloudy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService, public authService: AuthentificationService) {
    translate.setDefaultLang("en-EN");  
    translate.use(navigator.language);
  }
}
