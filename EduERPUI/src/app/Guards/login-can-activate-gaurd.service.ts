import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class LoginGaurdService implements CanActivate {
  constructor(private route: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      this.route.navigate(['/Login']);
    }
  }
}
