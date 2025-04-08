import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FirebaseAuthenticationService } from '../services/impl/firebase-authentication.service';
import { UsersService } from '../services/impl/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: FirebaseAuthenticationService,
    private userService: UsersService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const authUser = await this.authService.getCurrentUser();

      if (authUser) {
        const userDoc = await lastValueFrom(this.userService.getByUserId(authUser.id));
        if (userDoc?.role === 'Admin') {
          return resolve(true);
        }
      }

      this.router.navigate(['/home']);
      resolve(false);
    });
  }
}
