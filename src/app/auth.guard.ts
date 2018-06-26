import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router) {}

  canActivate(): boolean {
    if(this._authService.loggedIn()) {
      return true //if the user is logged in and has a token it returns true
    } else {
      this._router.navigate(['/login'])
      return false//if not logged in, I redirect the user to the loggin page
    }
  }
}
