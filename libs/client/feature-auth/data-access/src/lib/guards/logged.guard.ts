import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
