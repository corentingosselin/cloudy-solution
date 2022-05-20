import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthentificationService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const admin = this.authService.isAdmin();
    if (!admin) {
      this.router.navigate(['/']);
    }
    return admin;
  }
}
